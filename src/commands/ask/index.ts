import { ErrorEntries } from "../../types";
import queryServer from "./queryServer";
import createFileFromEntries from "./createRawFileFromEntries";
import writeClassFile from "../../writeClassFile";

export interface AskArgs {
  input?: string,
  outputFilePath?: string,
  errorField?: string
  headers?: string[]
}

const makeHeaders = (headers: string[] = []) => {
  let additionalHeaders = {};
  for (const header of headers) {
    const separator = header.indexOf(":");
    const name = header.substring(0, separator).trim();
    const value = header.substring(separator + 1).trim();
    if (!(name && value)) {
      throw new Error('Headers should be specified as "Name: Value"');
    }
    additionalHeaders[name] = value;
  }
  return additionalHeaders;
}

export default async function ask({ input, errorField, headers, outputFilePath }: AskArgs) {
  const urlRegex = /^https?:\/\//i;

  let errorEntries: ErrorEntries = {}
  if (urlRegex.test(input)) {
    errorEntries = await queryServer(input, errorField, makeHeaders(headers));
  }
  const rawFileContent = createFileFromEntries(errorEntries);
  return writeClassFile(rawFileContent, outputFilePath);
}
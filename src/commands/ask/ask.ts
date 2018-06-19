import createFileFromEntries from "./createRawFileFromEntries";
import writeClassFile from "../../writeClassFile";
import { ErrorOutputEntry } from "../../types";
import { makeHeaders } from "./makeHeaders";
import queryServer from "./queryServer";

export interface AskArgs {
  input?: string,
  outputFilePath?: string,
  errorField?: string
  headers?: string[]
}

export default async function ask({ input, errorField, headers, outputFilePath }: AskArgs) {
  const urlRegex = /^https?:\/\//i;

  let errorEntries: ErrorOutputEntry[] = []
  if (urlRegex.test(input)) {
    errorEntries = await queryServer(input, errorField, makeHeaders(headers));
  }
  const rawFileContent = createFileFromEntries(errorEntries);
  return writeClassFile(rawFileContent, outputFilePath);
}
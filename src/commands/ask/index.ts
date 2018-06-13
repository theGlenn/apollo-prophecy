import { ErrorEntries } from "../../types";
import queryServer from "./queryServer";
import createFileFromEntries from "./createRawFileFromEntries";
import writeClassFile from "../../writeClassFile";

export interface AskArgs {
  input?: string,
  outputFilePath?: string,
  errorType?: string
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

export default async function ask ({ input, errorType, headers, outputFilePath }: AskArgs) {
  const urlRegex = /^https?:\/\//i;
  console.log('🔮 Connecting with the oracles...');

  let errorEntries: ErrorEntries = {}
  if (urlRegex.test(input)) {
    errorEntries = await queryServer(input, errorType, makeHeaders(headers));
  }
  const rawFileContent = createFileFromEntries(errorEntries);
  const outputPath = writeClassFile(rawFileContent, outputFilePath);
  console.log('├── You will fail... but successfully');
  console.log(`└── ✨ All you need available in ${outputPath}`);
}
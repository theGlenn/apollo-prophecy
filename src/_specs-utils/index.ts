import * as os from 'os';
import * as osFs from 'fs';
import * as path from 'path';

export const mkdirTmp = () => {
  const tmpDir = os.tmpdir();
  const dirLocation = path.join(tmpDir, 'apollo-prophetic-test-');
  return osFs.mkdtempSync(dirLocation);
};

export const tmpErrorFilePath = (fileName: string) => path.join(mkdirTmp(), fileName);
export const removeWhiteSpaces = (text: string) => text.replace(/[^a-zA-Z]/g, "");

export const entries = {
  UnknownError: {
    "message": "An unknown error has occurred!  Please try again later",
    "code": "UNKNOWN"
  },
  ForbiddenError: {
    "message": "You are not allowed to do this",
    "code": "FORBIDDEN",
  },
};

export * as jestFS from './jest-fs';
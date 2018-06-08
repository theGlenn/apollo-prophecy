import * as fs from 'fs';
import * as path from 'path';
import { PathLike } from 'fs';

export const writeFileClass = (content: string, outPath: string = '_generated/Errors.ts') => {
  const _generatedDirName = path.dirname(outPath);
  console.log("DIR TO MAKE ", _generatedDirName);
  if(_generatedDirName != './' && !fs.existsSync(_generatedDirName)) {
    fs.mkdirSync(_generatedDirName);
  }
  return fs.writeFileSync(outPath, content)
}
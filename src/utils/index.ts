import * as fs from 'fs';
import * as path from 'path';
import { PathLike } from 'fs';

export const writeFile = (content: string, outPath: string) => {
  const _generatedDirName = path.parse(outPath).dir;
  if(_generatedDirName != './' && !fs.existsSync(_generatedDirName)) {
    fs.mkdirSync(_generatedDirName);
  }
  return fs.writeFileSync(outPath, content)
}
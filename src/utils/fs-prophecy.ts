import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as mkdirp from 'mkdirp';
import * as jsonfile from 'jsonfile';
import { JsonInputErrorEntry } from '../types';

export const writeFile = (path:  fs.PathLike, content: string) => fs.writeFileSync(path, content);
export const mkdirs = (path: fs.PathLike) => mkdirp.sync(path);
export const rmrf = (path: fs.PathLike) => rimraf.sync(path);
export function readJsonDef(filePath: jsonfile.Path) {
  return jsonfile.readFileSync(filePath) as JsonInputErrorEntry;
}
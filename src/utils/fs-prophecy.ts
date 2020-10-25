import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as mkdirp from 'mkdirp';
import * as jsonfile from 'jsonfile';
import { JsonInputErrorEntry } from '../types';

export const writeFile = (path: string, content: string) => fs.writeFileSync(path, content);
export const mkdirs = (path: string) => mkdirp.sync(path);
export const rmrf = (path: string) => rimraf.sync(path);
export function readJsonDef(filePath: jsonfile.Path) {
  return jsonfile.readFileSync(filePath) as JsonInputErrorEntry;
}
import * as jsonfile from 'jsonfile';
import * as fs from './fs-prophecy';

import { ErrorEntries } from '../types';

export function readJsonDef(filePath: jsonfile.Path, successCallback: (entries: ErrorEntries) => void) {
  jsonfile.readFile(filePath, (err, entries: ErrorEntries) => {
    if(!err) {
      successCallback(entries);
    } else {
      throw err;
    }
  });
}

export const removeWhiteSpaces = (text: string) => text.replace(/[^a-zA-Z]/g, "");

export {
  fs
} 

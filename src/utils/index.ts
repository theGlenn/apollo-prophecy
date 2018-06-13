import * as jsonfile from 'jsonfile';
import { ErrorEntries } from '../types';

export * from './fs-prophecy';

export function readJsonDef(filePath: jsonfile.Path, successCallback: (entries: ErrorEntries) => void) {
  jsonfile.readFile(filePath, (err, entries: ErrorEntries) => {
    if(!err) {
      successCallback(entries);
    } else {
      throw err;
    }
  });
}
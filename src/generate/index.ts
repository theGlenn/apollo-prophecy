import * as jsonfile from 'jsonfile';

import { ErrorEntries, ErrorEntry } from './../types'
import { writeFileClass } from './../FileWriter'
import createFile from './createFile'

export interface ProphecyArgs {
  intputFilePath: string,
  outputFilePath?: string,
}

export default function generate (args: ProphecyArgs) {
  console.log('You shall fail miserably here is how...', args);
  const { intputFilePath, outputFilePath } =  args;
  jsonfile.readFile(intputFilePath, (err, entries: ErrorEntries) => {
    if(!err) {
      let outPutFileRaw = createFile(entries);
    
      writeFileClass(outPutFileRaw, outputFilePath)
    }
  });
}
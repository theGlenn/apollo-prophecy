import * as jsonfile from 'jsonfile';

import { ErrorEntries, ErrorEntry } from './types'
import { writeFileClass } from './FileWriter'
import { generate } from './generate'

export interface ProphecyArgs {
  intputFilePath: string,
  outputFilePath?: string,
}

export default function prophecy (args: ProphecyArgs) {
  console.log('You shall fail miserably here is how...', args);
  const { intputFilePath, outputFilePath } =  args;
  jsonfile.readFile(intputFilePath, (err, entries: ErrorEntries) => {
    if(!err) {
      let outPutFileRaw = generate(entries);
    
      writeFileClass(outPutFileRaw, outputFilePath)
    }
  });
}
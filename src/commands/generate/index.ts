import * as jsonfile from 'jsonfile';
import writeClassFile from './writeClassFile'
import generateRawClass from './generateRawClass';

export interface ProphecyArgs {
  intputFilePath: string,
  outputFilePath?: string,
}

export default function generate (args: ProphecyArgs) {
  console.log('You shall fail miserably here is how...', args);
  const { intputFilePath, outputFilePath } =  args;
  jsonfile.readFile(intputFilePath, (err, entries) => {
    if(!err) {
      let outPutFileRaw = generateRawClass(entries);
    
      writeClassFile(outPutFileRaw, outputFilePath)
    }
  });
}
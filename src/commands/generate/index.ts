import * as jsonfile from 'jsonfile';
import writeClassFile from './writeClassFile'
import generateRawClass from './generateRawClass';

export interface ProphecyArgs {
  intputFilePath: string,
  outputFilePath?: string,
}

export default function generate (args: ProphecyArgs) {
  const { intputFilePath, outputFilePath } =  args;
  jsonfile.readFile(intputFilePath, (err, entries) => {
    if(!err) {
      const rawClassContent = generateRawClass(entries);
      const outputPath = writeClassFile(rawClassContent, outputFilePath);
      console.log('🔮 You will fail... but successfully');
      console.log(`└── ✨ Prophecy available at ${outputPath}`);
    }
  });
}
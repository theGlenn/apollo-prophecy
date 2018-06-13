import generateRawClass from './generateRawClass';
import { readJsonDef } from '../../utils';
import writeClassFile from '../../writeClassFile';

export interface ProphecyArgs {
  intputFilePath: string,
  outputFilePath?: string,
}

export default function generate (args: ProphecyArgs) {
  const { intputFilePath, outputFilePath } =  args;
  readJsonDef(intputFilePath, (entries) => {
    const rawClassContent = generateRawClass(entries);
    const outputPath = writeClassFile(rawClassContent, outputFilePath);
    console.log('🔮 You will fail... but successfully');
    console.log(`└── ✨ Prophecy available at ${outputPath}`);
  });
}
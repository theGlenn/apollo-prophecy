import generateRawClass from './generateRawClass';
import { readJsonDef } from './../../utils';
import writeClassFile from '../../writeClassFile';

export interface ProphecyArgs {
  intputFilePath: string,
  outputFilePath?: string,
}

export default async function generate (args: ProphecyArgs) {
  const { intputFilePath, outputFilePath } =  args;
  return new Promise<string>((resolve) => {
    readJsonDef(intputFilePath, (entries) => {
      const rawClassContent = generateRawClass(entries);
      const outputPath = writeClassFile(rawClassContent, outputFilePath);
      resolve(outputPath);
    });
  })
}
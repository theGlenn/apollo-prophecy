import generateRawClass from './generateRawClass';
import writeClassFile from '../../writeClassFile';
import checkEntries from './checkEntries';
import { fs } from './../../utils';

export interface ProphecyArgs {
  intputFilePath: string,
  outputFilePath?: string,
}

export default async function generate(args: ProphecyArgs) {
  const { intputFilePath, outputFilePath } =  args;
  const entries = checkEntries(fs.readJsonDef(intputFilePath));
  const rawClassContent = generateRawClass(entries);
  return writeClassFile(rawClassContent, outputFilePath);
}
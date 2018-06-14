import generateRawClass from './generateRawClass';
import { fs } from './../../utils';
import writeClassFile from '../../writeClassFile';
import { JsonInputErrorEntryRecord } from '../../types';

export interface ProphecyArgs {
  intputFilePath: string,
  outputFilePath?: string,
}

const checkEntries = (inputEntries: JsonInputErrorEntryRecord) => {
  const checks = Object.keys(inputEntries)
  .map(key => {
    const entry = inputEntries[key];
    return {
      name: key,
      hasCodeKey: entry.code !== undefined,
    }
  })
  .filter(({ hasCodeKey }) => !hasCodeKey);
   
  if(checks.length > 0) {
    const concernedNames = checks.map(({ name }) => name).join();
    throw Error(`[CodeKeyImperative] No "code" key found for: [${concernedNames}]`);
  }
  return inputEntries;
}

export default async function generate(args: ProphecyArgs) {
  const { intputFilePath, outputFilePath } =  args;
  const entries = checkEntries(fs.readJsonDef(intputFilePath));
  const rawClassContent = generateRawClass(entries);
  return writeClassFile(rawClassContent, outputFilePath);
}
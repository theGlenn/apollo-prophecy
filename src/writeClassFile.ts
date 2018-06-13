import { parse , normalize } from 'path';
import { mkdirs, writeFile } from './utils';

export default (content: string, output: string = '_generated') => {
  const outputPath = normalize(output);
  const fileExtension = parse(outputPath).ext;
  const fileSpecified = (fileExtension !== null && fileExtension !== undefined) && fileExtension.length > 0;
  const fileIsTS = fileExtension === '.ts';

  if(fileSpecified && !fileIsTS) {
    throw new Error('.ts file expected as output');
  }

  const outputFile = fileSpecified ? parse(outputPath).base : 'Errors.ts';
  const outputDirectory = fileSpecified ? parse(outputPath).dir : outputPath;

  //rmrf(outputDirectory);
  mkdirs(outputDirectory);

  const outputFilePath = normalize(`${outputDirectory}/${outputFile}`);
  writeFile(outputFilePath, content);

  return outputFilePath;
}
import { writeFile } from './../../utils'
import { parse , normalize} from 'path';

export default (content: string, outPutPath: string = '_generated') => {
  const outPath = normalize(outPutPath);
  const fileExtension = parse(outPath).ext;
  const fileSpecified = (fileExtension !== null && fileExtension !== undefined) && fileExtension.length > 0;
  const fileIsTS = fileExtension === '.ts';

  if(fileSpecified && !fileIsTS) {
    throw new Error('.ts file expected as output');
  }

  const fileName = fileSpecified ? parse(outPath).base : 'Errors.ts';
  const folderName = fileSpecified ? parse(outPath).dir : outPath;

  return writeFile(content, `${folderName}/${fileName}`);
}
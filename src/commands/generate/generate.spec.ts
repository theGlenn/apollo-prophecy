
import chai, { expect} from 'chai';
import chaiFS from 'chai-fs';
import generate from './generate';

import * as path from 'path';
import { entries, mkdirTmp } from '../../_specs-utils';
import { fs } from '../../utils';

chai.use(chaiFS);

describe('generate', () => {
  let tmpFolder: string;
  let errorsJsonInputFile: string;
  let errorsTsOutputFile: string;

  beforeAll(() => {
    tmpFolder = mkdirTmp();
    errorsJsonInputFile = path.join(tmpFolder, 'errors.json');
    errorsTsOutputFile = path.join(tmpFolder, 'Errors.ts');
    fs.mkdirs(tmpFolder);
    fs.writeFile(errorsJsonInputFile, JSON.stringify(entries));
  });

  it(`Should create the "Errors.ts" file in tmp folder`, async () => {
    const pathName = await generate({ intputFilePath: errorsJsonInputFile, outputFilePath: errorsTsOutputFile });
    ((expect(tmpFolder).to.be.a) as any).directory(tmpFolder).and.not.empty;
    ((expect(tmpFolder).to.be.a) as any).directory(tmpFolder).with.files(['Errors.ts', 'errors.json']);
  });
});
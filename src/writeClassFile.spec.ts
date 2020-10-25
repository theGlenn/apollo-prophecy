import * as path from 'path';
import * as chai from 'chai';
import chaiFS from 'chai-fs';

import writeClassFile from './writeClassFile'
import { fs } from './utils';

import { mkdirTmp, tmpErrorFilePath } from './_specs-utils';

chai.use(chaiFS);
const { expect } = chai;

describe('createClassFile', () => {
  it('Should create a folder with the "Errors.ts" file in it', () => {
    const tmpDirPath = mkdirTmp();
    const tmpErrorsPath = path.join(tmpDirPath, 'Errors.ts');
    writeClassFile("class SpecialError {}", tmpDirPath);
    ((expect(tmpDirPath).to.be.a) as any).directory(tmpDirPath).and.not.empty;
    ((expect(tmpDirPath).to.be.a) as any).directory(tmpDirPath).with.files(['Errors.ts']);
    ((expect(tmpErrorsPath).to.be.a) as any).to.be.a.file().with.content("class SpecialError {}");

    fs.rmrf(tmpDirPath);
  });

  it('Should create a folder with the "Errs.ts file" in it', () => {
    const tmpDirPath = tmpErrorFilePath('Errs.ts');
    writeClassFile("class SpecialError {}", tmpDirPath);
    ((expect(tmpDirPath).to.be.a) as any).to.be.a.file().and.not.empty;
    ((expect(tmpDirPath).to.be.a) as any).to.be.a.file().with.content("class SpecialError {}");

    fs.rmrf(tmpDirPath);
  });

  it('Should throw .ts file expected as output', () => {
    const tmpDirPath = tmpErrorFilePath('Errors.js');
    const writeClassFileThrow = () => writeClassFile("class SpecialError {}", tmpDirPath);
    expect(writeClassFileThrow).to.throw(".ts file expected as output");

    fs.rmrf(tmpDirPath);
  });
});
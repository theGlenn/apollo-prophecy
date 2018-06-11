import * as mocha from 'mocha';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as chai from 'chai';
import * as chaiFS from 'chai-fs';

import { rmrf } from './../../utils';
import writeClassFile from './writeClassFile'

chai.use(chaiFS);
const { expect } = chai;

const mkdirTmp = () => {
  const tmpDir = os.tmpdir();
  const dirLocation = path.join(os.tmpdir(), 'apollo-prophetic-test-');
  return fs.mkdtempSync(dirLocation);
};

describe('createClassFile', () => {
  it('Should create a folder with the "Errors.ts" file in it', () => {
    const tmpDirPath = mkdirTmp();
    const tmpErrorsPath = path.join(tmpDirPath, 'Errors.ts');
    writeClassFile("class SpecialError {}", tmpDirPath);
    ((expect(tmpDirPath).to.be.a) as any).directory(tmpDirPath).and.not.empty;
    ((expect(tmpDirPath).to.be.a) as any).directory(tmpDirPath).with.files(['Errors.ts']);
    ((expect(tmpErrorsPath).to.be.a) as any).to.be.a.file().with.content("class SpecialError {}");

    rmrf(tmpDirPath);
  });

  it('Should create a folder with the "Errs.ts file" in it', () => {
    const tmpDirPath = path.join(mkdirTmp(), 'Errs.ts');
    writeClassFile("class SpecialError {}", tmpDirPath);
    ((expect(tmpDirPath).to.be.a) as any).to.be.a.file().and.not.empty;
    ((expect(tmpDirPath).to.be.a) as any).to.be.a.file().with.content("class SpecialError {}");

    rmrf(tmpDirPath);
  });
});
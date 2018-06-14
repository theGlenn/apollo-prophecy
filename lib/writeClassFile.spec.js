"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var osFs = require("fs");
var path = require("path");
var chai = require("chai");
var chaiFS = require("chai-fs");
var writeClassFile_1 = require("./writeClassFile");
var utils_1 = require("./utils");
chai.use(chaiFS);
var expect = chai.expect;
var mkdirTmp = function () {
    var tmpDir = os.tmpdir();
    var dirLocation = path.join(os.tmpdir(), 'apollo-prophetic-test-');
    return osFs.mkdtempSync(dirLocation);
};
describe('createClassFile', function () {
    it('Should create a folder with the "Errors.ts" file in it', function () {
        var tmpDirPath = mkdirTmp();
        var tmpErrorsPath = path.join(tmpDirPath, 'Errors.ts');
        writeClassFile_1.default("class SpecialError {}", tmpDirPath);
        (expect(tmpDirPath).to.be.a).directory(tmpDirPath).and.not.empty;
        (expect(tmpDirPath).to.be.a).directory(tmpDirPath).with.files(['Errors.ts']);
        (expect(tmpErrorsPath).to.be.a).to.be.a.file().with.content("class SpecialError {}");
        utils_1.fs.rmrf(tmpDirPath);
    });
    it('Should create a folder with the "Errs.ts file" in it', function () {
        var tmpDirPath = path.join(mkdirTmp(), 'Errs.ts');
        writeClassFile_1.default("class SpecialError {}", tmpDirPath);
        (expect(tmpDirPath).to.be.a).to.be.a.file().and.not.empty;
        (expect(tmpDirPath).to.be.a).to.be.a.file().with.content("class SpecialError {}");
        utils_1.fs.rmrf(tmpDirPath);
    });
});
//# sourceMappingURL=writeClassFile.spec.js.map
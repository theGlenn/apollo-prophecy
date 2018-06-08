"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
exports.writeFileClass = function (content, outPath) {
    if (outPath === void 0) { outPath = '_generated/Errors.ts'; }
    var _generatedDirName = path.dirname(outPath);
    console.log("DIR TO MAKE ", _generatedDirName);
    if (_generatedDirName != './' && !fs.existsSync(_generatedDirName)) {
        fs.mkdirSync(_generatedDirName);
    }
    return fs.writeFileSync(outPath, content);
};
//# sourceMappingURL=FileWriter.js.map
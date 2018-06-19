"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var osFs = require("fs");
var path = require("path");
exports.mkdirTmp = function () {
    var tmpDir = os.tmpdir();
    var dirLocation = path.join(os.tmpdir(), 'apollo-prophetic-test-');
    return osFs.mkdtempSync(dirLocation);
};
exports.tmpErrorFilePath = function (fileName) { return path.join(exports.mkdirTmp(), fileName); };
exports.removeWhiteSpaces = function (text) { return text.replace(/[^a-zA-Z]/g, ""); };
exports.entries = {
    UnknownError: {
        "message": "An unknown error has occurred!  Please try again later",
        "code": "UNKNOWN"
    },
    ForbiddenError: {
        "message": "You are not allowed to do this",
        "code": "FORBIDDEN",
    },
};
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var rimraf = require("rimraf");
var mkdirp = require("mkdirp");
var jsonfile = require("jsonfile");
exports.writeFile = function (path, content) { return fs.writeFileSync(path, content); };
exports.mkdirs = function (path) { return mkdirp.sync(path); };
exports.rmrf = function (path) { return rimraf.sync(path); };
function readJsonDef(filePath) {
    return jsonfile.readFileSync(filePath);
}
exports.readJsonDef = readJsonDef;
//# sourceMappingURL=fs-prophecy.js.map
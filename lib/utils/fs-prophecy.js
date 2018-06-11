"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var rimraf = require("rimraf");
var mkdirp = require("mkdirp");
exports.writeFile = function (path, content) { return fs.writeFileSync(path, content); };
exports.mkdirs = function (path) { return mkdirp.sync(path); };
exports.rmrf = function (path) { return rimraf.sync(path); };
//# sourceMappingURL=fs-prophecy.js.map
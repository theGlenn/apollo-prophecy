"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var utils_1 = require("./utils");
exports.default = (function (content, output) {
    if (output === void 0) { output = '_generated'; }
    var outputPath = path_1.normalize(output);
    var fileExtension = path_1.parse(outputPath).ext;
    var fileSpecified = (fileExtension !== null && fileExtension !== undefined) && fileExtension.length > 0;
    var fileIsTS = fileExtension === '.ts';
    if (fileSpecified && !fileIsTS) {
        throw new Error('.ts file expected as output');
    }
    var outputFile = fileSpecified ? path_1.parse(outputPath).base : 'Errors.ts';
    var outputDirectory = fileSpecified ? path_1.parse(outputPath).dir : outputPath;
    utils_1.fs.mkdirs(outputDirectory);
    var outputFilePath = path_1.normalize(outputDirectory + "/" + outputFile);
    utils_1.fs.writeFile(outputFilePath, content);
    return outputFilePath;
});
//# sourceMappingURL=writeClassFile.js.map
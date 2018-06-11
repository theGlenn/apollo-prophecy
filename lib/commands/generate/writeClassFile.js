"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./../../utils");
var path_1 = require("path");
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
    //rmrf(outputDirectory);
    utils_1.mkdirs(outputDirectory);
    var outputFilePath = path_1.normalize(outputDirectory + "/" + outputFile);
    return utils_1.writeFile(outputFilePath, content);
});
//# sourceMappingURL=writeClassFile.js.map
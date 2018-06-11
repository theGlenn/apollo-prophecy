"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonfile = require("jsonfile");
var writeClassFile_1 = require("./writeClassFile");
var generateRawClass_1 = require("./generateRawClass");
function generate(args) {
    console.log('You shall fail miserably here is how...', args);
    var intputFilePath = args.intputFilePath, outputFilePath = args.outputFilePath;
    jsonfile.readFile(intputFilePath, function (err, entries) {
        if (!err) {
            var outPutFileRaw = generateRawClass_1.default(entries);
            writeClassFile_1.default(outPutFileRaw, outputFilePath);
        }
    });
}
exports.default = generate;
//# sourceMappingURL=index.js.map
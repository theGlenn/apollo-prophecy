"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonfile = require("jsonfile");
var FileWriter_1 = require("./FileWriter");
var generate_1 = require("./generate");
function prophecy(args) {
    console.log('You shall fail miserably here is how...', args);
    var intputFilePath = args.intputFilePath, outputFilePath = args.outputFilePath;
    jsonfile.readFile(intputFilePath, function (err, entries) {
        if (!err) {
            var outPutFileRaw = generate_1.generate(entries);
            FileWriter_1.writeFileClass(outPutFileRaw, outputFilePath);
        }
    });
}
exports.default = prophecy;
//# sourceMappingURL=prophecy.js.map
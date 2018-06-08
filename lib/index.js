"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var minimist = require("minimist");
var prophecy_1 = require("./prophecy");
var ask_1 = require("./ask");
;
var argv = minimist(process.argv.slice(2));
if (argv._.length > 0) {
    console.log('Executing with', argv);
    var _a = argv._[0], method = _a === void 0 ? 'prophecy' : _a;
    if (method === 'prophecy') {
        var file = argv.file, f = argv.f, out = argv.out, o = argv.o;
        var jsonfile = file || f || argv._[1];
        var outFile = out || o;
        prophecy_1.default({ intputFilePath: jsonfile, outputFilePath: outFile });
    }
    else {
        ask_1.default();
    }
}
//# sourceMappingURL=index.js.map
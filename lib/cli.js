#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var minimist = require("minimist");
var commands_1 = require("./commands");
;
var argv = minimist(process.argv.slice(2));
if (argv._.length > 0) {
    console.log('Executing with', argv);
    var _a = argv._[0], method = _a === void 0 ? 'generate' : _a;
    if (method === 'generate') {
        var file = argv.file, f = argv.f, out = argv.out, o = argv.o;
        var jsonfile = file || f || argv._[1];
        var outFile = out || o;
        commands_1.generate({ intputFilePath: jsonfile, outputFilePath: outFile });
    }
    else if (method === 'ask-errors') {
        commands_1.askErrors();
    }
}
//# sourceMappingURL=cli.js.map
#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
var _1 = require("./");
var path_1 = require("path");
function handleError(error) {
    console.error(error);
    process.exit(1);
}
process.on('unhandledRejection', function (error) { throw error; });
process.on('uncaughtException', handleError);
;
yargs
    .command(['generate [jsonFile]', 'prophecy'], 'Generate a Typescript file containg all application errors from a JSON input', {
    out: {
        demand: true,
        describe: 'Output path for error file',
        default: './Errors.ts',
        normalize: true,
        coerce: path_1.resolve
    },
}, function (argv) { return __awaiter(_this, void 0, void 0, function () {
    var _a, jsonFile, outputFilePath, intputFilePath, generatedOutputPath;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = argv.jsonFile, jsonFile = _a === void 0 ? './errors.json' : _a, outputFilePath = argv.out;
                intputFilePath = path_1.resolve(jsonFile);
                return [4 /*yield*/, _1.commands.generate({ intputFilePath: intputFilePath, outputFilePath: outputFilePath })];
            case 1:
                generatedOutputPath = _b.sent();
                console.info('🔮 You will fail... but successfully');
                console.info("\u2514\u2500\u2500 \uD83D\uDC41 Prophecy available at " + generatedOutputPath);
                return [2 /*return*/];
        }
    });
}); })
    .command(['ask <schema>', 'oracles'], 'Generate a .ts file that exposes helpers for all the errors exposed through the server api', {
    field: {
        demandOption: true,
        describe: 'Field to query on Query type',
        default: 'errors',
    },
    out: {
        demandOption: true,
        describe: 'Output path for error file',
        default: './Errors.ts',
        normalize: true,
        coerce: path_1.resolve
    },
}, function (argv) { return __awaiter(_this, void 0, void 0, function () {
    var input, outputFilePath, errorField, outputPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.info('🔮 Connecting with the oracles...');
                input = argv.schema, outputFilePath = argv.out, errorField = argv.field;
                return [4 /*yield*/, _1.commands.ask({ input: input, errorField: errorField, outputFilePath: outputFilePath })];
            case 1:
                outputPath = _a.sent();
                console.info('├── 🙏 You will fail... but successfully');
                console.info("\u2514\u2500\u2500 \uD83D\uDC41 All you need to know is available at " + outputPath);
                return [2 /*return*/];
        }
    });
}); })
    .fail(function (message, error) { return handleError(error ? error : new Error(message)); })
    .help()
    .version()
    .strict()
    .argv;
//# sourceMappingURL=cli.js.map
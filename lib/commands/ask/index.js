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
Object.defineProperty(exports, "__esModule", { value: true });
var queryServer_1 = require("./queryServer");
var createRawFileFromEntries_1 = require("./createRawFileFromEntries");
var writeClassFile_1 = require("../../writeClassFile");
var makeHeaders = function (headers) {
    if (headers === void 0) { headers = []; }
    var additionalHeaders = {};
    for (var _i = 0, headers_1 = headers; _i < headers_1.length; _i++) {
        var header = headers_1[_i];
        var separator = header.indexOf(":");
        var name_1 = header.substring(0, separator).trim();
        var value = header.substring(separator + 1).trim();
        if (!(name_1 && value)) {
            throw new Error('Headers should be specified as "Name: Value"');
        }
        additionalHeaders[name_1] = value;
    }
    return additionalHeaders;
};
function ask(_a) {
    var input = _a.input, errorField = _a.errorField, headers = _a.headers, outputFilePath = _a.outputFilePath;
    return __awaiter(this, void 0, void 0, function () {
        var urlRegex, errorEntries, rawFileContent;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    urlRegex = /^https?:\/\//i;
                    errorEntries = [];
                    if (!urlRegex.test(input)) return [3 /*break*/, 2];
                    return [4 /*yield*/, queryServer_1.default(input, errorField, makeHeaders(headers))];
                case 1:
                    errorEntries = _b.sent();
                    _b.label = 2;
                case 2:
                    rawFileContent = createRawFileFromEntries_1.default(errorEntries);
                    return [2 /*return*/, writeClassFile_1.default(rawFileContent, outputFilePath)];
            }
        });
    });
}
exports.default = ask;
//# sourceMappingURL=index.js.map
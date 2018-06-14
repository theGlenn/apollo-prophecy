"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var graphql_tag_1 = require("graphql-tag");
var node_fetch_1 = require("node-fetch");
var apollo_link_1 = require("apollo-link");
var apollo_link_http_1 = require("apollo-link-http");
var makeOperation = function (erroType) { return ({
    query: graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["query {\n    ", " {\n      name\n      message\n      extensions {\n        code\n      }\n    }\n  }\n  "], ["query {\n    ", " {\n      name\n      message\n      extensions {\n        code\n      }\n    }\n  }\n  "])), erroType),
}); };
function exeuteServerQuery(serverUri, type, headers) {
    var operation = makeOperation(type);
    var link = new apollo_link_http_1.HttpLink({ uri: serverUri, fetch: node_fetch_1.default, headers: headers });
    return apollo_link_1.makePromise(apollo_link_1.execute(link, operation));
}
function default_1(serverUri, field, headers) {
    if (field === void 0) { field = 'errors'; }
    return __awaiter(this, void 0, void 0, function () {
        var result, e_1, errors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, exeuteServerQuery(serverUri, field, headers)];
                case 1:
                    result = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    throw e_1;
                case 3:
                    if (result.errors) {
                        throw new Error("Errors occured querying \"" + field + "\": " + result.errors);
                    }
                    if (!result.data || !result.data[field]) {
                        throw new Error("No Errors found to generate on query field " + field);
                    }
                    errors = result.data[field];
                    return [2 /*return*/, errors];
            }
        });
    });
}
exports.default = default_1;
var templateObject_1;
//# sourceMappingURL=queryServer.js.map
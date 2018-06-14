"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var createError_1 = require("./createError");
var types_1 = require("../../types");
function scalarGQLTpeFromValue(value) {
    switch (typeof value) {
        case "string":
            return "String";
        case "boolean":
            return "Boolean";
        case "number":
            if (value % 1 === 0) {
                return "Int";
            }
            else {
                return "Float";
            }
        default:
            return null;
    }
}
function toRawClassesArray(entries) {
    return Object.keys(entries).map(function (key) {
        var _a = entries[key], message = _a.message, code = _a.code, rest = __rest(_a, ["message", "code"]);
        return createError_1.default(key, message, code, rest);
    });
}
exports.toRawClassesArray = toRawClassesArray;
exports.exludeMessageAndName = function (entry) { return Object.keys(entry).filter(function (key) { return key !== 'message' || 'name'; }); };
function toScalarTypesMap(entries) {
    return Object.values(entries).map(function (entry) { return Object.keys(entry).filter(function (key) { return key !== 'message'; }).reduce(function (prev, entryFieldKey) {
        var fieldValue = entry[entryFieldKey];
        var fieldType = scalarGQLTpeFromValue(fieldValue);
        prev[entryFieldKey] = fieldType;
        return prev;
    }, {}); }, {});
}
exports.toScalarTypesMap = toScalarTypesMap;
function generatePropheticErrorType(typesArray) {
    var fieldsReduced = typesArray.filter(function (type) { return type; }).reduce(function (prev, typesMap) {
        var isFirst = prev === {};
        for (var key in typesMap) {
            var fieldType = typesMap[key];
            var isNullableType = true;
            if (!isFirst && prev[key] && prev[key].isNullableType) {
                if (prev[key].isNullableType !== true) {
                    prev[key].isNullableType = prev[key].isNullableType;
                }
                else {
                    prev[key].isNullableType = false;
                }
            }
            var value = { type: fieldType, isNullableType: isNullableType };
            prev[key] = value;
        }
        return prev;
    }, {});
    var fields = Object.entries(fieldsReduced).map(function (_a) {
        var name = _a[0], _b = _a[1], type = _b.type, isNullableType = _b.isNullableType;
        return name + ": " + type + (isNullableType ? '?' : '');
    });
    return "\n    type PropheticErrorExtensions {\n      " + fields.join('\n      ') + "\n    }\n    \n    type PropheticError {\n      name: String\n      message: String?\n      extensions: PropheticErrorExtensions\n    }\n  ";
}
exports.generatePropheticErrorType = generatePropheticErrorType;
function default_1(entries) {
    var rawErrorClasses = toRawClassesArray(entries).join('\n');
    var fieldsTypesMapArray = toScalarTypesMap(entries);
    var rawPropheticErrorAndExtensionsType = generatePropheticErrorType(fieldsTypesMapArray);
    var errorsList = types_1.toOutputErrors(entries);
    var classFile = "\n  import { ApolloError } from 'apollo-server'\n\n  export const errorsList = " + JSON.stringify(errorsList, null, 2) + ";\n  export const errorType = `" + rawPropheticErrorAndExtensionsType + "`;\n  \n  " + createError_1.PropheticErrorTextDef + "\n  \n  " + rawErrorClasses + "\n  ";
    return classFile;
}
exports.default = default_1;
//# sourceMappingURL=generateRawClass.js.map
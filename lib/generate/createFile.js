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
function scalaraTypeFromValue(value) {
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
function createDefinitions(entries) {
    var errors = [];
    for (var key in entries) {
        var _a = entries[key], message = _a.message, code = _a.code, rest = __rest(_a, ["message", "code"]);
        var errorPart = createError_1.default(key, message, code, rest);
        errors.push(errorPart);
    }
    return errors;
}
function mapFieldToGraphQLTypes(entries) {
    return Object.values(entries).map(function (entry) { return Object.keys(entry).reduce(function (prev, entryFieldKey) {
        var fieldValue = entry[entryFieldKey];
        var fieldType = scalaraTypeFromValue(fieldValue);
        prev[entryFieldKey] = fieldType;
        return prev;
    }, {}); }, {});
}
exports.mapFieldToGraphQLTypes = mapFieldToGraphQLTypes;
function createGraphqlType(entries) {
    var fieldsTypesMapArray = mapFieldToGraphQLTypes(entries);
    var fieldsReduced = fieldsTypesMapArray.reduce(function (prev, typesMap) {
        for (var key in typesMap) {
            var fieldType = typesMap[key];
            var value = { type: fieldType, isNullableType: !prev[key] };
            prev[key] = value;
        }
        return prev;
    }, {});
    var fields = Object.entries(fieldsReduced).map(function (_a) {
        var name = _a[0], _b = _a[1], type = _b.type, isNullableType = _b.isNullableType;
        return name + ": " + type + (isNullableType ? '?' : '');
    });
    return "\n    type PythianError {\n      " + fields.join('\n      ') + "\n    }\n  ";
}
exports.createGraphqlType = createGraphqlType;
function default_1(entries) {
    var allErros = createDefinitions(entries).join('\n');
    var type = createGraphqlType(entries);
    var classFile = "\n  import { ApolloError } from 'apollo-server'\n\n  export const definitions = " + JSON.stringify(entries, null, 2) + ";\n  export const errorType = `" + type + "`;\n  \n  " + createError_1.PythianErrorTextDef + "\n  \n  " + allErros + "\n  ";
    return classFile;
}
exports.default = default_1;
//# sourceMappingURL=createFile.js.map
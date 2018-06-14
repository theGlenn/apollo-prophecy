"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../../types");
var TopMostImportsAndConfigDef = "/* tslint:disable */ \nimport { ApolloError } from \"apollo-client\";\nimport { GraphQLError } from \"graphql\";";
var PropheticErrorCodeEnumDef = "\nexport enum PropheticErrorCode {\n  CodeLessError = 'NONE',\n  _VALUES_\n}";
var PropheticErrorDef = "\nexport class PropheticError {\n  constructor(public codes: string[]){}\n\n  private inCodes(code: PropheticErrorCode){ return this.codes.indexOf(code) > -1; }\n\n  get isCodeLessError() { return this.inCodes(PropheticErrorCode.CodeLessError); }\n  _FUNCTIONS_\n}";
var PropheticErrorGetterDef = "get is$_ENUM_$() { return this.inCodes(PropheticErrorCode.$_ENUM_$); }";
var PropheticErrorHandledDef = "\nexport interface Handler {\n  (): any\n}\n\nexport class PropheticErrorHandled {\n  private handler: Handler = () => {}\n\n  constructor(public codes: string[]){}\n\n  private inCodes(code: PropheticErrorCode, handler: Handler){\n    if(this.codes.indexOf(code) > -1){\n      this.handler = handler\n    }\n\n    return this;\n  }\n\n  CodeLessError(handler: Handler) { return this.inCodes(PropheticErrorCode.CodeLessError, handler); }\n  _FUNCTIONS_\n  handle() { return this.handler(); }\n}";
var PropheticErrorHandlerDef = "$_ENUM_$(handler: Handler) { return this.inCodes(PropheticErrorCode.$_ENUM_$, handler); }";
var BottomExportedMethods = "\nconst CODE_LESS_EXTENSION = { code: 'NONE'};\nconst findCodes = (error: ApolloError | GraphQLError): PropheticErrorCode[] => {\n  if(error instanceof ApolloError) {\n    return error.graphQLErrors.map((gError) => findCodes(gError)[0]);\n  } else if(error.extensions) {\n    const { extensions: { code } = CODE_LESS_EXTENSION } = error;\n    return [code];\n  }\n\n  return [PropheticErrorCode.CodeLessError];\n}\n\nexport const errorHere = (error: ApolloError | GraphQLError | undefined ) => {\n  if(!error) {\n    return new PropheticError([]);\n  }\n  const codes = findCodes(error);\n  return new PropheticError(codes);\n}\n\nexport const isThis = (error: ApolloError | GraphQLError | undefined) => {\n  if(!error) {\n    return new PropheticErrorHandled([]);\n  }\n  const codes = findCodes(error);\n  return new PropheticErrorHandled(codes);\n}";
var toNameAndCodeTupleArray = function (entriesArray) {
    var entries = types_1.toErrorEntries(entriesArray);
    return Object.keys(entries).map(function (key) {
        var _a = entries[key].extensions, extensions = _a === void 0 ? { code: undefined } : _a;
        return [key, extensions.code];
    }).filter(function (_a) {
        var _ = _a[0], code = _a[1];
        return code !== undefined;
    });
};
function default_1(entries) {
    var nameAndCodeTuples = toNameAndCodeTupleArray(entries);
    var enums = nameAndCodeTuples.map(function (_a) {
        var name = _a[0], code = _a[1];
        return name + " = \"" + code + "\"";
    }).join(',\n  ');
    var errorDefFun = nameAndCodeTuples.map(function (_a) {
        var name = _a[0];
        return "" + PropheticErrorGetterDef.replace("$_ENUM_$", name).replace("$_ENUM_$", name);
    }).join('\n  ');
    var errorHandledFun = nameAndCodeTuples.map(function (_a) {
        var name = _a[0];
        return "" + PropheticErrorHandlerDef.replace("$_ENUM_$", name).replace("$_ENUM_$", name);
    }).join('\n  ');
    return TopMostImportsAndConfigDef + "\n  " + PropheticErrorCodeEnumDef.replace('_VALUES_', enums) + "\n  " + PropheticErrorDef.replace('_FUNCTIONS_', errorDefFun) + "\n  " + PropheticErrorHandledDef.replace('_FUNCTIONS_', errorHandledFun) + "\n  " + BottomExportedMethods;
}
exports.default = default_1;
//# sourceMappingURL=createRawFileFromEntries.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var createRawFileFromEntries_1 = require("./createRawFileFromEntries");
var errors = [{
        "name": "UnknownError",
        "message": "An unknown error has occurred!  Please try again later",
        extensions: {
            "code": "UNKNOWN"
        }
    }, {
        "name": "ForbiddenError",
        "message": "You are not allowed to do this",
        extensions: {
            "code": "FORBIDDEN"
        }
    }, {
        "name": "AuthenticationRequiredError",
        "message": "You must be logged in to do this",
        extensions: {
            "code": "AUTH_REQUIRED"
        }
    }];
var expectedFile = "/* tslint:disable */ \nimport { ApolloError } from \"apollo-client\";\nimport { GraphQLError } from \"graphql\";\n  \nexport enum PropheticErrorCode {\n  CodeLessError = 'NONE',\n  UnknownError = \"UNKNOWN\",\n  ForbiddenError = \"FORBIDDEN\",\n  AuthenticationRequiredError = \"AUTH_REQUIRED\"\n}\n  \nexport class PropheticError {\n  constructor(public codes: string[]){}\n\n  private inCodes(code: PropheticErrorCode){ return this.codes.indexOf(code) > -1; }\n\n  get isCodeLessError() { return this.inCodes(PropheticErrorCode.CodeLessError); }\n  get isUnknownError() { return this.inCodes(PropheticErrorCode.UnknownError); }\n  get isForbiddenError() { return this.inCodes(PropheticErrorCode.ForbiddenError); }\n  get isAuthenticationRequiredError() { return this.inCodes(PropheticErrorCode.AuthenticationRequiredError); }\n}\n  \nexport interface Handler {\n  (): any\n}\n\nexport class PropheticErrorHandled {\n  private handler: Handler = () => {}\n\n  constructor(public codes: string[]){}\n\n  private inCodes(code: PropheticErrorCode, handler: Handler){\n    if(this.codes.indexOf(code) > -1){\n      this.handler = handler\n    }\n\n    return this;\n  }\n\n  CodeLessError(handler: Handler) { return this.inCodes(PropheticErrorCode.CodeLessError, handler); }\n  UnknownError(handler: Handler) { return this.inCodes(PropheticErrorCode.UnknownError, handler); }\n  ForbiddenError(handler: Handler) { return this.inCodes(PropheticErrorCode.ForbiddenError, handler); }\n  AuthenticationRequiredError(handler: Handler) { return this.inCodes(PropheticErrorCode.AuthenticationRequiredError, handler); }\n  handle() { return this.handler(); }\n}\n  \nconst CODE_LESS_EXTENSION = { code: 'NONE'};\nconst findCodes = (error: ApolloError | GraphQLError): PropheticErrorCode[] => {\n  if(error instanceof ApolloError) {\n    return error.graphQLErrors.map((gError) => findCodes(gError)[0]);\n  } else if(error.extensions) {\n    const { extensions: { code } = CODE_LESS_EXTENSION } = error;\n    return [code];\n  }\n\n  return [PropheticErrorCode.CodeLessError];\n}\n\nexport const errorHere = (error: ApolloError | GraphQLError | undefined ) => {\n  if(!error) {\n    return new PropheticError([]);\n  }\n  const codes = findCodes(error);\n  return new PropheticError(codes);\n}\n\nexport const isThis = (error: ApolloError | GraphQLError | undefined) => {\n  if(!error) {\n    return new PropheticErrorHandled([]);\n  }\n  const codes = findCodes(error);\n  return new PropheticErrorHandled(codes);\n}";
describe('createRawFile', function () {
    it('Should correctly generate raw file', function () {
        var errorsRawFile = createRawFileFromEntries_1.default(errors);
        chai_1.expect(errorsRawFile).to.be.eq(expectedFile);
    });
});
//# sourceMappingURL=createRawFileFromEntries.spec.js.map
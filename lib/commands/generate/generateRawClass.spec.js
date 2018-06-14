"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var generateRawClass_1 = require("./generateRawClass");
var utils_1 = require("../../utils");
var errors = {
    UnknownError: {
        "message": "An unknown error has occurred!  Please try again later",
        "code": "UNKNOWN"
    },
    ForbiddenError: {
        "message": "You are not allowed to do this",
        "code": "FORBIDDEN",
    },
    AuthenticationRequiredError: {
        "message": "You must be logged in to do this",
        "code": "AUTH_REQUIRED"
    },
};
var expectedTypes = [{ code: "String" }, { code: "String" }, { code: "String" }];
describe('generateRawClass', function () {
    it('toRawClassesArray should correctly returns string classes definition', function () {
        var rawClasses = generateRawClass_1.toRawClassesArray(errors);
        chai_1.expect(rawClasses.length).to.be.eq(3);
        chai_1.expect(utils_1.removeWhiteSpaces(rawClasses[1])).to.be.eql(utils_1.removeWhiteSpaces("\n    export class ForbiddenError extends PropheticError {\n      constructor(properties?: Record<string, any>) {\n        super(\"ForbiddenError\", \"You are not allowed to do this\", \"FORBIDDEN\" }, properties);\n      }\n    }\n    "));
    });
    it('Should correctly create the GraphQL Type Definition string', function () {
        var scalarTypesArray = generateRawClass_1.toScalarTypesMap(errors);
        var rawGraphqlTypes = generateRawClass_1.generatePropheticErrorType(scalarTypesArray);
        chai_1.expect(utils_1.removeWhiteSpaces(rawGraphqlTypes)).to.be.eq(utils_1.removeWhiteSpaces("\n    type PropheticErrorExtensions {\n      code: String?\n    }\n\n    type PropheticError {\n      name: String\n      message: String?\n      extensions: PropheticErrorExtensions\n    }"));
    });
    it('Should correctly map object fields to the right type', function () {
        var scalarTypesArray = generateRawClass_1.toScalarTypesMap(errors);
        chai_1.expect(scalarTypesArray).to.be.eql(expectedTypes);
    });
});
//# sourceMappingURL=generateRawClass.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var createFile_1 = require("./createFile");
var test_utils_1 = require("./test.utils");
var errors = {
    UnknownError: {
        "message": "An unknown error has occurred!  Please try again later",
        "code": "CAN_NOT_FETCH_BY_ID"
    },
    ForbiddenError: {
        "message": "You are not allowed to do this"
    },
    AuthenticationRequiredError: {
        "message": "You must be logged in to do this",
        "code": "AUTH_REQUIRED"
    },
    "MagicTokenExpiredError": {
        "message": "Token expired try login-in again",
        "code": "MAGIC_TOKEN_EXPIRED"
    },
};
var types = [{
        message: "String",
        code: "String"
    }, {
        message: "String",
    }, {
        message: "String",
        code: "String"
    }, {
        message: "String",
        code: "String"
    }];
describe('createError', function () {
    it('Should correctly map object fields to the right type', function () {
        var errorFieldsType = createFile_1.mapFieldToGraphQLTypes(errors);
        chai_1.expect(errorFieldsType).to.be.eql(types);
        //expect(() => { throw new SpecialError()}).to.throw('SpecialError');
    });
    it('Should correctly ', function () {
        var type = createFile_1.createGraphqlType(errors);
        chai_1.expect(test_utils_1.classNoWP(type)).to.be.eql(test_utils_1.classNoWP("\n    type PythianError {\n      message: String\n      code: String\n    }\n    "));
    });
});
//# sourceMappingURL=createFile.spec.js.map
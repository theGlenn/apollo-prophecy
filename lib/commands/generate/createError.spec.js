"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var createError_1 = require("./createError");
var _specs_utils_1 = require("../../_specs-utils");
describe('createError', function () {
    it('Should create Special error classs string', function () {
        var SpecialError = createError_1.default("SpecialError", "Very special", "SPECIAL");
        var expectedClass = "\n    export class SpecialError extends PropheticError {\n      constructor(properties?: Record<string, any>) {\n        super(\"SpecialError\", \"Very special\", \"SPECIAL\", properties);\n      }\n    }\n    ";
        chai_1.expect(_specs_utils_1.removeWhiteSpaces(SpecialError)).to.be.eq(_specs_utils_1.removeWhiteSpaces(expectedClass));
    });
});
//# sourceMappingURL=createError.spec.js.map
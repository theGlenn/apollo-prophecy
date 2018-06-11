"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var createError_1 = require("./createError");
var test_utils_1 = require("./test.utils");
describe('createError', function () {
    it('Should create Special error classs string', function () {
        var SpecialError = createError_1.default("SpecialError", "Very special", "SPECIAL");
        var expectedClass = "\n    export class SpecialError extends PropheticError {\n      constructor(properties?: Record<string, any>) {\n        super(\"SpecialError\", \"Very special\", \"SPECIAL\", properties);\n      }\n    }\n    ";
        chai_1.expect(test_utils_1.classNoWP(SpecialError)).to.be.eq(test_utils_1.classNoWP(expectedClass));
        //expect(() => { throw new SpecialError()}).to.throw('SpecialError');
    });
});
//# sourceMappingURL=createError.spec.js.map
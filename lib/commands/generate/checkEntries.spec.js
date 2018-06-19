"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var checkEntries_1 = require("./checkEntries");
var _specs_utils_1 = require("../../_specs-utils");
var mockReadFromFile = function () { return JSON.parse("{\n  \"UnknownError\": {\n    \"message\": \"An unknown error has occurred!  Please try again later\",\n    \"code\": \"UNKNOWN\"\n  },\n  \"NoCodeError\": {\n    \"message\": \"You are not allowed to do this\"\n  }\n}"); };
describe('checkEntries', function () {
    it('Should positevely check the entries and return them', function () {
        chai_1.expect(checkEntries_1.default(_specs_utils_1.entries)).to.be.eq(_specs_utils_1.entries);
    });
    it('Should throw No "code" key found', function () {
        var checkEntriesMock = function () { return checkEntries_1.default(mockReadFromFile()); };
        chai_1.expect(checkEntriesMock).to.throw('[CodeKeyImperative] No "code" key found for: [NoCodeError]');
    });
});
//# sourceMappingURL=checkEntries.spec.js.map
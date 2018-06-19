"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var makeHeaders_1 = require("./makeHeaders");
describe('makeHeader', function () {
    it('Should create header', function () {
        var headers = makeHeaders_1.makeHeaders(['Authorization: Bearer uoauzeaouhenaoea']);
        chai_1.expect(headers).to.be.eql({
            Authorization: 'Bearer uoauzeaouhenaoea',
        });
    });
    it('Should create empty header', function () {
        var headers = makeHeaders_1.makeHeaders();
        chai_1.expect(headers).to.be.empty;
    });
});
//# sourceMappingURL=makeHeaders.spec.js.map
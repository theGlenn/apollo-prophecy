"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/apollographql/apollo-codegen/blob/master/packages/apollo-codegen/src/cli.ts
exports.makeHeaders = function (headers) {
    if (headers === void 0) { headers = []; }
    var additionalHeaders = {};
    for (var _i = 0, headers_1 = headers; _i < headers_1.length; _i++) {
        var header = headers_1[_i];
        var separator = header.indexOf(":");
        var name_1 = header.substring(0, separator).trim();
        var value = header.substring(separator + 1).trim();
        if (!(name_1 && value)) {
            throw new Error('Headers should be specified as "Name: Value"');
        }
        additionalHeaders[name_1] = value;
    }
    return additionalHeaders;
};
//# sourceMappingURL=makeHeaders.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (inputEntries) {
    var checks = Object.keys(inputEntries).map(function (key) {
        var entry = inputEntries[key];
        return { name: key, hasCodeKey: entry.code !== undefined };
    }).filter(function (_a) {
        var hasCodeKey = _a.hasCodeKey;
        return !hasCodeKey;
    });
    if (checks.length > 0) {
        var concernedNames = checks.map(function (_a) {
            var name = _a.name;
            return name;
        }).join();
        throw Error("[CodeKeyImperative] No \"code\" key found for: [" + concernedNames + "]");
    }
    return inputEntries;
});
//# sourceMappingURL=checkEntries.js.map
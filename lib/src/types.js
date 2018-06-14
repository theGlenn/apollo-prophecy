"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function toErrorEntries(entries) {
    return entries.reduce(function (map, entry) {
        map[entry.name] = entry;
        return map;
    }, {});
}
exports.toErrorEntries = toErrorEntries;
function toOutputErrors(entries) {
    return Object.keys(entries).map(function (key) {
        var _a = entries[key], name = _a.name, message = _a.message, code = _a.code, rest = __rest(_a, ["name", "message", "code"]);
        return {
            name: name || key,
            message: message,
            extensions: __assign({ code: code }, rest)
        };
    });
}
exports.toOutputErrors = toOutputErrors;
//# sourceMappingURL=types.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var apollo_client_1 = require("apollo-client");
var PropheticErrorCode;
(function (PropheticErrorCode) {
    PropheticErrorCode["CodeLessError"] = "NONE";
    PropheticErrorCode["UnknownError"] = "CAN_NOT_FETCH_BY_ID";
    PropheticErrorCode["ForbiddenError"] = "null";
    PropheticErrorCode["AuthenticationRequiredError"] = "AUTH_REQUIRED";
    PropheticErrorCode["MagicTokenExpiredError"] = "MAGIC_TOKEN_EXPIRED";
    PropheticErrorCode["UserNotFoundError"] = "USER_NOT_FOUND";
    PropheticErrorCode["UserAlreadyExist"] = "USER_ALREADY_EXISTS";
})(PropheticErrorCode = exports.PropheticErrorCode || (exports.PropheticErrorCode = {}));
var PropheticError = /** @class */ (function () {
    function PropheticError(codes) {
        this.codes = codes;
    }
    PropheticError.prototype.inCodes = function (code) { return this.codes.indexOf(code) > -1; };
    Object.defineProperty(PropheticError.prototype, "isCodeLessError", {
        get: function () { return this.inCodes(PropheticErrorCode.CodeLessError); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropheticError.prototype, "isUnknownError", {
        get: function () { return this.inCodes(PropheticErrorCode.UnknownError); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropheticError.prototype, "isForbiddenError", {
        get: function () { return this.inCodes(PropheticErrorCode.ForbiddenError); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropheticError.prototype, "isAuthenticationRequiredError", {
        get: function () { return this.inCodes(PropheticErrorCode.AuthenticationRequiredError); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropheticError.prototype, "isMagicTokenExpiredError", {
        get: function () { return this.inCodes(PropheticErrorCode.MagicTokenExpiredError); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropheticError.prototype, "isUserNotFoundError", {
        get: function () { return this.inCodes(PropheticErrorCode.UserNotFoundError); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropheticError.prototype, "isUserAlreadyExist", {
        get: function () { return this.inCodes(PropheticErrorCode.UserAlreadyExist); },
        enumerable: true,
        configurable: true
    });
    return PropheticError;
}());
exports.PropheticError = PropheticError;
var PropheticErrorHandled = /** @class */ (function () {
    function PropheticErrorHandled(codes) {
        this.codes = codes;
        this.handler = function () { };
    }
    PropheticErrorHandled.prototype.inCodes = function (code, handler) {
        if (this.codes.indexOf(code) > -1) {
            this.handler = handler;
        }
        return this;
    };
    PropheticErrorHandled.prototype.CodeLessError = function (handler) { return this.inCodes(PropheticErrorCode.CodeLessError, handler); };
    PropheticErrorHandled.prototype.UnknownError = function (handler) { return this.inCodes(PropheticErrorCode.UnknownError, handler); };
    PropheticErrorHandled.prototype.ForbiddenError = function (handler) { return this.inCodes(PropheticErrorCode.ForbiddenError, handler); };
    PropheticErrorHandled.prototype.AuthenticationRequiredError = function (handler) { return this.inCodes(PropheticErrorCode.AuthenticationRequiredError, handler); };
    PropheticErrorHandled.prototype.MagicTokenExpiredError = function (handler) { return this.inCodes(PropheticErrorCode.MagicTokenExpiredError, handler); };
    PropheticErrorHandled.prototype.UserNotFoundError = function (handler) { return this.inCodes(PropheticErrorCode.UserNotFoundError, handler); };
    PropheticErrorHandled.prototype.UserAlreadyExist = function (handler) { return this.inCodes(PropheticErrorCode.UserAlreadyExist, handler); };
    PropheticErrorHandled.prototype.handle = function () { return this.handler(); };
    return PropheticErrorHandled;
}());
exports.PropheticErrorHandled = PropheticErrorHandled;
var CODE_LESS_EXTENSION = { code: 'NONE' };
var findCodes = function (error) {
    if (error instanceof apollo_client_1.ApolloError) {
        return error.graphQLErrors.map(function (gError) { return findCodes(gError)[0]; });
    }
    else if (error.extensions) {
        var _a = error.extensions, code = (_a === void 0 ? CODE_LESS_EXTENSION : _a).code;
        return [code];
    }
    return [PropheticErrorCode.CodeLessError];
};
exports.errorHere = function (error) {
    if (!error) {
        return new PropheticError([]);
    }
    var codes = findCodes(error);
    return new PropheticError(codes);
};
exports.isThis = function (error) {
    if (!error) {
        return new PropheticErrorHandled([]);
    }
    var codes = findCodes(error);
    return new PropheticErrorHandled(codes);
};
//# sourceMappingURL=Errors.js.map
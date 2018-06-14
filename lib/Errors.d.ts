export declare enum PropheticErrorCode {
    CodeLessError = "NONE",
    UnknownError = "CAN_NOT_FETCH_BY_ID",
    ForbiddenError = "null",
    AuthenticationRequiredError = "AUTH_REQUIRED",
    MagicTokenExpiredError = "MAGIC_TOKEN_EXPIRED",
    UserNotFoundError = "USER_NOT_FOUND",
    UserAlreadyExist = "USER_ALREADY_EXISTS"
}
export declare class PropheticError {
    codes: string[];
    constructor(codes: string[]);
    private inCodes;
    readonly isCodeLessError: boolean;
    readonly isUnknownError: boolean;
    readonly isForbiddenError: boolean;
    readonly isAuthenticationRequiredError: boolean;
    readonly isMagicTokenExpiredError: boolean;
    readonly isUserNotFoundError: boolean;
    readonly isUserAlreadyExist: boolean;
}
export interface Handler {
    (): any;
}
export declare class PropheticErrorHandled {
    codes: string[];
    private handler;
    constructor(codes: string[]);
    private inCodes;
    CodeLessError(handler: Handler): this;
    UnknownError(handler: Handler): this;
    ForbiddenError(handler: Handler): this;
    AuthenticationRequiredError(handler: Handler): this;
    MagicTokenExpiredError(handler: Handler): this;
    UserNotFoundError(handler: Handler): this;
    UserAlreadyExist(handler: Handler): this;
    handle(): any;
}
export declare const errorHere: (error: any) => PropheticError;
export declare const isThis: (error: any) => PropheticErrorHandled;

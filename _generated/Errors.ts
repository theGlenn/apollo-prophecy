
  import { ApolloError } from 'apollo-server'

  export const definitions = {
  "UnknownError": {
    "message": "An unknown error has occurred!  Please try again later",
    "code": "CAN_NOT_FETCH_BY_ID"
  },
  "ForbiddenError": {
    "message": "You are not allowed to do this"
  },
  "AuthenticationRequiredError": {
    "message": "You must be logged in to do this",
    "code": "AUTH_REQUIRED"
  },
  "MagicTokenExpiredError": {
    "message": "Token expired try login-in again",
    "code": "MAGIC_TOKEN_EXPIRED"
  },
  "UserNotFoundError": {
    "message": "No user found",
    "code": "USER_NOT_FOUND"
  },
  "UserAlreadyExist": {
    "message": "User with this email already exist, try login instead",
    "code": "USER_ALREADY_EXISTS"
  }
};
  export const errorType = `
    type PythianError {
      message: String
      code: String
    }
  `;
  
  class PythianError extends ApolloError {
  constructor(name: string, message: string, code?: string, properties?: Record<string, any>) {
    super(message, code, properties);

    // Set the prototype explicitly.
    // https://stackoverflow.com/a/41102306
    Object.setPrototypeOf(this, SyntaxError.prototype);
    Object.defineProperty(this, 'name', { value: name });
  }
}
  
  
  export class UnknownError extends PythianError {
    constructor(properties?: Record<string, any>) {
      super("UnknownError", "An unknown error has occurred!  Please try again later", "CAN_NOT_FETCH_BY_ID", properties);
    }
  }
  

  export class ForbiddenError extends PythianError {
    constructor(properties?: Record<string, any>) {
      super("ForbiddenError", "You are not allowed to do this", undefined, properties);
    }
  }
  

  export class AuthenticationRequiredError extends PythianError {
    constructor(properties?: Record<string, any>) {
      super("AuthenticationRequiredError", "You must be logged in to do this", "AUTH_REQUIRED", properties);
    }
  }
  

  export class MagicTokenExpiredError extends PythianError {
    constructor(properties?: Record<string, any>) {
      super("MagicTokenExpiredError", "Token expired try login-in again", "MAGIC_TOKEN_EXPIRED", properties);
    }
  }
  

  export class UserNotFoundError extends PythianError {
    constructor(properties?: Record<string, any>) {
      super("UserNotFoundError", "No user found", "USER_NOT_FOUND", properties);
    }
  }
  

  export class UserAlreadyExist extends PythianError {
    constructor(properties?: Record<string, any>) {
      super("UserAlreadyExist", "User with this email already exist, try login instead", "USER_ALREADY_EXISTS", properties);
    }
  }
  
  
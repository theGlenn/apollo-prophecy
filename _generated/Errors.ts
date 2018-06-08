
  import { ApolloError } from 'apollo-server'

export const definitions = {
  "AuthenticationRequiredError": {
    "message": "You must be logged in to do this",
    "code": "AUTH_REQUIRED"
  },
  "UserNotFoundError": {
    "message": "No user found",
    "code": "USER_NOT_FOUND"
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
  
  
  export class AuthenticationRequiredError extends PythianError {
    constructor(properties?: Record<string, any>) {
      super("AuthenticationRequiredError", "You must be logged in to do this", "AUTH_REQUIRED", properties);
    }
  }
  

  export class UserNotFoundError extends PythianError {
    constructor(properties?: Record<string, any>) {
      super("UserNotFoundError", "No user found", "USER_NOT_FOUND", properties);
    }
  }
  
  
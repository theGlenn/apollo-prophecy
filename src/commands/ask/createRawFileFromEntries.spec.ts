import { expect } from 'chai';
import createRawFileFromEntries from './createRawFileFromEntries'
import { writeFile } from '../../utils/fs-prophecy';

const errors = [{
    "name": "UnknownError",
    "message": "An unknown error has occurred!  Please try again later",
    extensions: {
      "code": "UNKNOWN"
    }
  }, {
    "name": "ForbiddenError",
    "message": "You are not allowed to do this",
    extensions: {
      "code": "FORBIDDEN"
    }
  }, {
    "name": "AuthenticationRequiredError",
    "message": "You must be logged in to do this",
    extensions: {
      "code": "AUTH_REQUIRED"
    }
  }];

const expectedFile = `/* tslint:disable */ 
import { ApolloError } from "apollo-client";
import { GraphQLError } from "graphql";
  
export enum PropheticErrorCode {
  CodeLessError = 'NONE',
  UnknownError = "UNKNOWN",
  ForbiddenError = "FORBIDDEN",
  AuthenticationRequiredError = "AUTH_REQUIRED"
}
  
export class PropheticError {
  constructor(public codes: string[]){}

  private inCodes(code: PropheticErrorCode){ return this.codes.indexOf(code) > -1; }

  get isCodeLessError() { return this.inCodes(PropheticErrorCode.CodeLessError); }
  get isUnknownError() { return this.inCodes(PropheticErrorCode.UnknownError); }
  get isForbiddenError() { return this.inCodes(PropheticErrorCode.ForbiddenError); }
  get isAuthenticationRequiredError() { return this.inCodes(PropheticErrorCode.AuthenticationRequiredError); }
}
  
export interface Handler {
  (): any
}

export class PropheticErrorHandled {
  private handler: Handler = () => {}

  constructor(public codes: string[]){}

  private inCodes(code: PropheticErrorCode, handler: Handler){
    if(this.codes.indexOf(code) > -1){
      this.handler = handler
    }

    return this;
  }

  CodeLessError(handler: Handler) { return this.inCodes(PropheticErrorCode.CodeLessError, handler); }
  UnknownError(handler: Handler) { return this.inCodes(PropheticErrorCode.UnknownError, handler); }
  ForbiddenError(handler: Handler) { return this.inCodes(PropheticErrorCode.ForbiddenError, handler); }
  AuthenticationRequiredError(handler: Handler) { return this.inCodes(PropheticErrorCode.AuthenticationRequiredError, handler); }
  handle() { return this.handler(); }
}
  
const CODE_LESS_EXTENSION = { code: 'NONE'};
const findCodes = (error: ApolloError | GraphQLError): PropheticErrorCode[] => {
  if(error instanceof ApolloError) {
    return error.graphQLErrors.map((gError) => findCodes(gError)[0]);
  } else if(error.extensions) {
    const { extensions: { code } = CODE_LESS_EXTENSION } = error;
    return [code];
  }

  return [PropheticErrorCode.CodeLessError];
}

export const errorHere = (error: ApolloError | GraphQLError | undefined ) => {
  if(!error) {
    return new PropheticError([]);
  }
  const codes = findCodes(error);
  return new PropheticError(codes);
}

export const isThis = (error: ApolloError | GraphQLError | undefined) => {
  if(!error) {
    return new PropheticErrorHandled([]);
  }
  const codes = findCodes(error);
  return new PropheticErrorHandled(codes);
}`

describe('createRawFile', () => {
  it('Should correctly generate raw file', () => {
    const errorsRawFile = createRawFileFromEntries(errors);
    expect(errorsRawFile).to.be.eq(expectedFile);
  });
});
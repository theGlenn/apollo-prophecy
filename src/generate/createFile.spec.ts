import * as mocha from 'mocha';
import { expect } from 'chai';
import createFile, { mapFieldToGraphQLTypes, createGraphqlType } from './createFile'
import { classNoWP } from './test.utils'

const errors = {
  UnknownError: {
    "message": "An unknown error has occurred!  Please try again later",
    "code": "CAN_NOT_FETCH_BY_ID"
  },
  ForbiddenError: {
    "message": "You are not allowed to do this"
  },
  AuthenticationRequiredError: {
    "message": "You must be logged in to do this",
    "code": "AUTH_REQUIRED"
  },
  "MagicTokenExpiredError": {
    "message": "Token expired try login-in again",
    "code": "MAGIC_TOKEN_EXPIRED"
  },
};

const types = [{
  message: "String",
  code: "String"
}, {
  message: "String",
}, {
  message: "String",
  code: "String"
}, {
  message: "String",
  code: "String"
}];
describe('createError', () => {
  it('Should correctly map object fields to the right type', () => {
    const errorFieldsType = mapFieldToGraphQLTypes(errors);

    expect(errorFieldsType).to.be.eql(types);
    //expect(() => { throw new SpecialError()}).to.throw('SpecialError');
  });

  it('Should correctly ', () => {
    const type = createGraphqlType(errors);
    expect(classNoWP(type)).to.be.eql(classNoWP(`
    type PythianError {
      message: String
      code: String
    }
    `));
  });
});
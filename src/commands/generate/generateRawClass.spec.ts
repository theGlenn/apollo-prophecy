import { expect } from 'chai';
import { toRawClassesArray,toScalarTypesMap, generatePropheticErrorType } from './generateRawClass'
import { removeWhiteSpaces } from '../../_specs-utils';

const errors = {
  UnknownError: {
    "message": "An unknown error has occurred!  Please try again later",
    "code": "UNKNOWN"
  },
  ForbiddenError: {
    "message": "You are not allowed to do this",
    "code": "FORBIDDEN",
  },
  AuthenticationRequiredError: {
    "message": "You must be logged in to do this",
    "code": "AUTH_REQUIRED"
  },
};

const expectedTypes = [ { code: "String" }, { code: "String" }, { code: "String" }];
const expectedOutputClass = `export class ForbiddenError extends PropheticError {
  constructor(properties?: Record<string, any>) {
    super("ForbiddenError", "You are not allowed to do this", "FORBIDDEN", properties);
  }
}`
describe('generateRawClass', () => {
  it('toRawClassesArray should correctly returns string classes definition', () => {
    const rawClasses = toRawClassesArray(errors);
    expect(rawClasses.length).to.be.eq(3);
    expect(rawClasses[1]).to.be.eq(expectedOutputClass);
  });

  it('Should correctly create the GraphQL Type Definition string', () => {
    const scalarTypesArray = toScalarTypesMap(errors);
    const rawGraphqlTypes = generatePropheticErrorType(scalarTypesArray);
    
    expect(removeWhiteSpaces(rawGraphqlTypes)).to.be.eq(removeWhiteSpaces(`
    type PropheticErrorExtensions {
      code: String?
    }

    type PropheticError {
      name: String
      message: String?
      extensions: PropheticErrorExtensions
    }`));
  });

  it('Should correctly map object fields to the right type', () => {
    const scalarTypesArray = toScalarTypesMap(errors);
    expect(scalarTypesArray).to.be.eql(expectedTypes);
  });
});
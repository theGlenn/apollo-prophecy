import * as mocha from 'mocha';
import { expect } from 'chai';
import createError from './createError'
import { removeWhiteSpaces } from './../../utils'

describe('createError', () => {
  it('Should create Special error classs string', () => {
    const SpecialError = createError("SpecialError", "Very special", "SPECIAL");
    const expectedClass = `
    export class SpecialError extends PropheticError {
      constructor(properties?: Record<string, any>) {
        super("SpecialError", "Very special", "SPECIAL", properties);
      }
    }
    `;
    expect(removeWhiteSpaces(SpecialError)).to.be.eq(removeWhiteSpaces(expectedClass));
  });
});
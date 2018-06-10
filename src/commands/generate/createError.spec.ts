import * as mocha from 'mocha';
import { expect } from 'chai';
import createError from './createError'
import { classNoWP } from './test.utils'

describe('createError', () => {
  it('Should create Special error classs string', () => {
    const SpecialError = createError("SpecialError", "Very special", "SPECIAL");
    const expectedClass = `
    export class SpecialError extends PythianError {
      constructor(properties?: Record<string, any>) {
        super("SpecialError", "Very special", "SPECIAL", properties);
      }
    }
    `;
    expect(classNoWP(SpecialError)).to.be.eq(classNoWP(expectedClass));
    //expect(() => { throw new SpecialError()}).to.throw('SpecialError');
  });
});
import createError from './createError'
import { removeWhiteSpaces } from '../../_specs-utils';

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
    expect(removeWhiteSpaces(SpecialError)).toEqual(removeWhiteSpaces(expectedClass));
  });
});
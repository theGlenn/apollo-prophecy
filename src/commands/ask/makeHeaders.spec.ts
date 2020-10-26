import { makeHeaders } from './makeHeaders';

describe('makeHeader', () => {
  it('Should create header', () => {
    const headers = makeHeaders(['Authorization: Bearer uoauzeaouhenaoea']);
    expect(headers).toEqual({
      Authorization: 'Bearer uoauzeaouhenaoea',
    });
  });

  it('Should create empty header', () => {
    const headers = makeHeaders();
    expect(headers).toEqual({});
  });

  it('Should throw -> Headers should be specified as "Name: Value"', () => {
    expect(() => makeHeaders(['Authorization Bearer uoauzeaouhenaoea'])).toThrow('Headers should be specified as "Name: Value"');
  });
});
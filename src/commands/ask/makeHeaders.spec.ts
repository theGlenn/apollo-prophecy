import { expect } from 'chai';
import { makeHeaders } from './makeHeaders';

describe('makeHeader', () => {
  it('Should create header', () => {
    const headers = makeHeaders(['Authorization: Bearer uoauzeaouhenaoea']);
    expect(headers).to.be.eql({
      Authorization: 'Bearer uoauzeaouhenaoea',
    });
  });

  it('Should create empty header', () => {
    const headers = makeHeaders();
    expect(headers).to.be.empty;
  });
});
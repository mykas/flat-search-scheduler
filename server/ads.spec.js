import { readFileSync } from 'fs';
import { resolve } from 'path';
import { expect } from 'chai';
import { parseRow } from './ads';

const data = readFileSync(
  resolve(__dirname, '../__mocks__/htmls/ad-row.html'),
  'utf8',
);

describe('Aruodas Ads Parser', () => {
  describe('Function parseRow', () => {
    it('Should return an object', () => {
      expect(typeof parseRow('')).to.equal('object');
    });
    it('Should return address,price,img and rooms ', () => {
      const expected = ['address', 'price', 'img', 'rooms'];
      expect(Object.keys(parseRow(data))).to.deep.equal(expected);
    });

    describe('address property', () => {
      it('Should be  Naujamiestis, Panerių g.', () => {
        const expected = 'Naujamiestis, Panerių g.';
        expect(parseRow(data).address).to.equal(expected);
      });
    });

    describe('price property', () => {
      it('Should be 450 €', () => {
        const expected = '450 €';
        expect(parseRow(data).price).to.equal(expected);
      });
    });

    describe('img property', () => {
      it('Should be a http link', () => {
        const expected =
          'https://aruodas-img.dgn.lt/object_63_66668907/nuotrauka.jpg';
        expect(parseRow(data).img).to.equal(expected);
      });
    });

    describe('rooms property', () => {
      it('Should be 2', () => {
        const expected = '2';
        expect(parseRow(data).rooms).to.equal(expected);
      });
    });
  });
});

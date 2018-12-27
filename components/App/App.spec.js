import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import nock from 'nock';

import App from './App';
import {
  mockRequest,
  mountApp,
  wixEventually,
} from '../../../test/test-common';
import { CardDriver } from '../Card/Card.driver';
import { HeaderDriver } from '../Layout/Header/Header.driver';

const mockData = [
  {
    img: 'https://aruodas-img.dgn.lt/object_63_66668907/nuotrauka.jpg',
    address: 'Naujamiestis, Panerių g.',
    rooms: '4',
    price: '450 $',
  },
  {
    img: 'https://aruodas-img.dgn.lt/object_63_66668907/nuotrauka.jpg',
    address: 'Naujamiestis, Panerių g.',
    rooms: '4',
    price: '450 $',
  },
];

describe('App', () => {
  let wrapper;

  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error(`pending mocks: ${nock.pendingMocks()}`);
    }
  });
  afterEach(() => {
    nock.cleanAll();
  });

  beforeEach(() => {
    wrapper && wrapper.detach();
  });

  it('should render a title correctly', async () => {
    mockRequest('/scrap', [mockData[0]]);

    wrapper = mountApp(<App />);
    const evaluate = () =>
      expect(
        HeaderDriver(wrapper.find('[data-hook="header"]')).getTitle(),
      ).to.equal('Kill Aruodas');

    await wixEventually(evaluate);
  });

  it('should render multiple cards', async () => {
    mockRequest('/scrap', mockData);

    wrapper = mountApp(<App />);

    const evaluate = () => {
      const cardDriverList = wrapper.find('[data-hook="card"]');
      expect(CardDriver(cardDriverList.at(0)).getRooms()).to.equal(
        mockData[0].rooms,
      );
      expect(CardDriver(cardDriverList.at(1)).getRooms()).to.equal(
        mockData[1].rooms,
      );
    };

    await wixEventually(evaluate);
  });
});

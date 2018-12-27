import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import Header from './Header';

import { mountApp } from '../../../../test/test-common';
import { HeaderDriver } from './Header.driver';

describe('Header', () => {
  let wrapper;

  afterEach(() => wrapper.detach());

  it('should render page title corectly', () => {
    wrapper = mountApp(<Header />);
    expect(HeaderDriver(wrapper).getTitle()).to.equal('Kill Aruodas');
  });
  it('should render svg image', () => {
    wrapper = mountApp(<Header />);
    expect(HeaderDriver(wrapper).getImage()).to.equal('pirate.svg');
  });
});

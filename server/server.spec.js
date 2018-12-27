import axios from 'axios';
import { expect } from 'chai';
import adapter from 'axios/lib/adapters/http';
import { beforeAndAfter, app } from '../environment';
import { baseURL } from '../test-common';
import nock from 'nock';
import { wixAxiosInstanceConfig } from 'wix-axios-config';

const axiosInstance = wixAxiosInstanceConfig(axios, {
  baseURL,
  adapter,
});

const createAList = data => `
<div class="list-search">
  <div class="list-row">
    <div class="list-adress">
      <a>${data.addressRegion}<br/>${data.addressAddress}</a>
      <div class="price">
        <div class="list-item-price">${data.price}</div>
      </div>
    </div>
    <div class="list-img">
      <div class="list-photo">
        <a><img src="${data.img}"/></a>
      </div>
    </div>
    <div class="list-RoomNum">
      ${data.rooms}
    </div>
  </div>
</div>
`;

const createGoogleAdRow = () => {
  `
<div class="list-search">
  <div class="list-row"/>
</div>
  `;
};

describe('When rendering', () => {
  beforeAndAfter();

  after(() => {
    nock.restore();
  });

  it('should display a title', async () => {
    const url = app.getUrl('/');
    const response = await axiosInstance.get(url);

    expect(response.data).to.contain('Wix Full Stack Project Boilerplate');
  });

  it('should return apartments data', async () => {
    const url = app.getUrl('/scrap');

    const expected = {
      img: 'img',
      rooms: 'bla',
      price: '450',
      address: 'Naujamiestis, Aguonu g.',
    };
    const mockedHtmlData = createAList({
      img: 'img',
      rooms: 'bla',
      price: '450',
      addressRegion: 'Naujamiestis',
      addressAddress: 'Aguonu g.',
    });

    const mockAruodas = nock('http://www.aruodas.lt')
      .get('/butu-nuoma/vilniuje/puslapis/1')
      .query({
        FRoomNumMin: '1',
        FRoomNumMax: '2',
      })
      .reply(200, mockedHtmlData);

    const response = await axiosInstance.get(url);
    expect(response.data[0]).to.deep.equal(expected);
  });
  it('should skip google ad based rows', async () => {
    const url = app.getUrl('/scrap');

    const mockAruodas = nock('http://www.aruodas.lt')
      .get('/butu-nuoma/vilniuje/puslapis/1')
      .query({
        FRoomNumMin: '1',
        FRoomNumMax: '2',
      })
      .reply(200, createGoogleAdRow);

    const response = await axiosInstance.get(url);
    expect(response.data.length).to.equal(0);
  });
});

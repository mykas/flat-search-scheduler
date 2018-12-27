const cheerio = require('cheerio');
const axios = require('axios');

const baseURL = 'http://www.aruodas.lt/butu-nuoma/vilniuje';

const parseRow = html => {
  const $ = cheerio.load(html, {
    decodeEntities: false,
  });
  const address = $('.list-adress a').html() || '';
  const price = $('.list-adress .price .list-item-price').html() || '';
  const href = $('.list-img .list-photo a').attr('href') || '';
  const rooms =
    $('.list-RoomNum')
      .text()
      .trim() || '';
  return {
    address: address === '' ? '' : address.replace('<br>', ', '),
    price: price,
    href: 'https://www.aruodas.lt' + href,
    rooms: rooms,
  };
};

const getPilaitesAdds = async () => {
  let list = [];
  const response = await axios.get(
    `${baseURL}/pilaiteje/?FAreaOverAllMin=40&FAreaOverAllMax=70&FRoomNumMin=2&FRoomNumMax=2&FPriceMin=350&FPriceMax=550&FOrder=AddDate`
  );
  const $ = cheerio.load(response.data);
  $('.list-search .list-row').each((i, elm) => {
    $('.list-adress', elm).hasClass('list-adress') //eslint-disable-line
      ? list.push(parseRow(elm))
      : undefined;
  });
  return list;
};

const getNaujamiestisAdds = async () => {
  let list = [];
  const response = await axios.get(
    `${baseURL}/naujamiestyje/?FAreaOverAllMin=40&FAreaOverAllMax=70&FRoomNumMin=2&FRoomNumMax=2&FPriceMin=350&FPriceMax=550&FOrder=AddDate`
  );
  const $ = cheerio.load(response.data);
  $('.list-search .list-row').each((i, elm) => {
    $('.list-adress', elm).hasClass('list-adress') //eslint-disable-line
      ? list.push(parseRow(elm))
      : undefined;
  });
  return list;
};

module.exports = {
  getPilaitesAdds,
  getNaujamiestisAdds,
};

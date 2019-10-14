const cron = require('node-cron');
const { getTop } = require('./ads');

const tls = require('tls');

var send = require('gmail-send')({
  //var send = require('../index.js')({
  user: 'mykolas.sindeikis@gmail.com',
  // user: credentials.user,                  // Your GMail account used to send emails
  pass: 'special-password',
  // pass: credentials.pass,                  // Application-specific password
  to: 'mykolas.sindeikis@gmail.com',
  // to:   credentials.user,                  // Send to yourself
  // you also may set array of recipients:
  // [ 'user1@gmail.com', 'user2@gmail.com' ]
  // from:    credentials.user,            // from: by default equals to user
  // replyTo: credentials.user,            // replyTo: by default undefined
  // bcc: 'some-user@mail.com',            // almost any option of `nodemailer` will be passed to it
  subject: 'Pilaites Butu pokytis',
  text: 'gmail-send example 1', // Plain text
  //html:    '<b>html text</b>'            // HTML
});
tls.DEFAULT_ECDH_CURVE = 'auto';

let entrypoints = {
  pilaites: 'https://aruodas-img.dgn.lt/object_63_65103229/nuotrauka.jpg',
  naujamiescio: 'https://aruodas-img.dgn.lt/object_63_65103229/nuotrauka.jpg',
  snipiskese: 'https://aruodas-img.dgn.lt/object_63_65103229/nuotrauka.jpg',
  siauresMiestelis:
    'https://aruodas-img.dgn.lt/object_63_65103229/nuotrauka.jpg',
};

const validateSend = (list, type) => {
  if (list[0].href !== entrypoints[type]) {
    send({
      subject: type + ' ' + 'pokytis',
      text: JSON.stringify(list),
    });
    entrypoints[type] = list[0].href;
  }
};

cron.schedule('*/2 * * * *', async () => {
  const pilaites = await getTop('pilaiteje');
  const naujamiescio = await getTop('naujamiestyje');
  const snipiskes = await getTop('snipiskese');
  const siauresMiestelis = await getTop('siaures-miestelyje');
  await validateSend(pilaites, 'pilaiteje');
  await validateSend(naujamiescio, 'naujamiestyje');
  await validateSend(snipiskes, 'snipiskese');
  await validateSend(siauresMiestelis, 'siauresMiestelis');
  console.log(entrypoints);
  console.log('Fetched');
});

const express = require('express');
const next = require('next');
const cron = require('node-cron');
const { getTop } = require('./server/ads');

const tls = require('tls');

var send = require('gmail-send')({
  //var send = require('../index.js')({
  user: 'mykolas.sindeikis@gmail.com',
  // user: credentials.user,                  // Your GMail account used to send emails
  pass: 'kyoxmmzjoxrfqazi',
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

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const entrypoints = {
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

app.prepare().then(() => {
  const server = express();

  // Set up home page as a simple render of the page.
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  cron.schedule('*/2 * * * *', async () => {
    const pilaites = await getTop('pilaiteje');
    const naujamiescio = await getTop('naujamiestyje');
    const snipiskes = await getTop('snipiskese');
    const siauresMiestelis = await getTop('siaures-miestelyje');
    await validateSend(pilaites, 'pilaiteje');
    await validateSend(naujamiescio, 'naujamiestyje');
    await validateSend(snipiskes, 'snipiskese');
    await validateSend(siauresMiestelis, 'siauresMiestelis');
    console.log('Fetched');
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

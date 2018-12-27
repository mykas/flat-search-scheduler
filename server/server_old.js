import { readFileSync } from 'fs';
import { getAllAds } from '../server/ads';
import tls from 'tls';

tls.DEFAULT_ECDH_CURVE = 'auto';

module.exports = (app, context) => {
  const config = context.config.load('mykolas-aruodas');
  const templatePath = './src/index.ejs';
  const templateFile = readFileSync(templatePath, 'utf8');

  app.get('/scrap', async (req, res) => {
    const response = await getAllAds();
    res.send(response);
  });

  app.get('/', (req, res) => {
    const renderModel = getRenderModel(req);
    const html = ejs.render(templateFile, renderModel, {
      cache: isProduction,
      filename: templatePath,
    });
    res.send(html);
  });

  function getRenderModel(req) {
    return {
      locale: req.aspects['web-context'].language,
      basename: req.aspects['web-context'].basename,
      debug:
        req.aspects['web-context'].debug ||
        process.env.NODE_ENV === 'development',
      clientTopology: config.clientTopology,
      title: 'Wix Full Stack Project Boilerplate',
    };
  }

  return app;
};

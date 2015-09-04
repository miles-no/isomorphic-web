/* global process */
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import React from 'react';
import HtmlComponent from './app/HtmlComponent.jsx';
import MainComponent from './app/components/Main.jsx';
import pkg from './package.json';

const Html = React.createFactory(HtmlComponent);
const Main = React.createFactory(MainComponent);
const isProduction = process.env.NODE_ENV === 'production';
const assetPath = isProduction ? './public/assets' : './.tmp/public/assets';

const app = express();

app.use('/assets', express.static(assetPath));
app.use(cookieParser());
app.use(bodyParser.json());

app.use((req, res, next) => {
  var html = React.renderToStaticMarkup(new Html({
    appVersion: pkg.version,
    baseUrl: process.env.BASE_URL || '',
    title: 'Isomorphic Web',
    markup: React.renderToString(new Main())
  }));

  res.send(html);
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`Listening on port ${server.address().port}`);
});

export default server;

/* global process */
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import React from 'react';

import express from 'express';
import bodyParser from 'body-parser';

import MainComponent from '../app/components/Main.jsx';
import pkg from '../package.json';

const Main = React.createFactory(MainComponent);

const app = express();

const renderPage = (html) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="/static/app.css">
      </head>
      <body>
        <div id="app-container">${html}</div>
        <script src="/static/bundle.js"></script>
      </body>
     </html>
  `;
};

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use('/static', express.static(__dirname + '/../dist'));
}

app.use((req, res, next) => {
  let componentHtml = React.renderToString(new Main());
  res.status(200).end(renderPage(componentHtml));
});

const server = app.listen(3002, () => {
  const host =server.address().address;
  const port = server.address().port;
  console.log(`Listening at http://${host}:${port}`);
});

export default server;

import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import React from 'react';
import { renderToString } from 'react-dom/server'

import express from 'express';

import MainComponent from '../app/components/Main.jsx';
const Main = React.createFactory(MainComponent);

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

const app = express();

if (process.env.NODE_ENV != 'production') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { 
    noInfo: true, 
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use('/static', express.static(__dirname + '/../dist'));
}

app.use((req, res, next) => {
  const componentHtml = renderToString(new Main());
  res.status(200).end(renderPage(componentHtml));
});

const server = app.listen(3002, () => {
  const port = server.address().port;
  console.log(`Listening at http://localhost:${port}`);
});

export default server;

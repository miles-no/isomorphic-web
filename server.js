'use strict';
require('dotenv').load();
require('babel/register');

var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    pkg = require('./package.json'),
    React = require('react'),
    HtmlComponent = React.createFactory(require('./app/HtmlComponent.jsx')),
    MainComponent = React.createFactory(require('./app/components/Main.jsx'));

var app = express();

app.use('/assets', express.static('./public/assets'));
if(process.env.NODE_ENV !== 'production'){
  app.use('/assets', express.static('./.tmp/public/assets'));
}
app.use(cookieParser());
app.use(bodyParser.json());

app.use(function (req, res, next) {
  var html = React.renderToStaticMarkup(new HtmlComponent({
    appVersion: pkg.version,
    baseUrl: process.env.BASE_URL || '',
    title: 'Isomorphic Web',
    markup: React.renderToString(new MainComponent())
  }));

  res.send(html);
});

var server = app.listen(process.env.PORT || 8000, function() {
  console.log('Listening on port %d', server.address().port);
});

module.exports = server;

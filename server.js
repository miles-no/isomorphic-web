'use strict';
require('dotenv').load();
require('node-jsx').install({extension: '.jsx'});

var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    serialize = require('serialize-javascript'),
    pkg = require('./package.json'),
    React = require('react'),
    fluxibleApp = require('./app/app.jsx'),
    navigateAction = require('flux-router-component').navigateAction,
    HtmlComponent = React.createFactory(require('./app/HtmlComponent.jsx'));

var app = express();

app.use('/assets', express.static('./public/assets'));
if(process.env.NODE_ENV !== 'production'){
  app.use('/assets', express.static('./.tmp/public/assets'));
}
app.use(cookieParser());
app.use(bodyParser.json());

app.use(function (req, res, next) {
  var context = fluxibleApp.createContext();
  context.executeAction(navigateAction, { url: req.url, type: 'pageload' }, function (err) {

    if (err) {
      if (err.status && err.status === 404) {
        return next();
      } else {
        return next(err);
      }
    }

    var AppComponent = fluxibleApp.getAppComponent();
    React.withContext(context.getComponentContext(), function () {
      var html = React.renderToStaticMarkup(new HtmlComponent({
        appVersion: pkg.version,
        baseUrl: process.env.BASE_URL || '',
        state: 'window.__dehydratedState=' + serialize(fluxibleApp.dehydrate(context)) + ';',
        title: 'Isomorphic Web',
        markup: React.renderToString(new AppComponent({
            context: context.getComponentContext()
        }))
      }));

      res.send(html);
    });
  });
});

var server = app.listen(process.env.PORT || 8000, function() {
  console.log('Listening on port %d', server.address().port);
});

module.exports = server;

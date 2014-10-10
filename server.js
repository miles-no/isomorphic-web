'use strict';

var express = require('express'),
    React = require('react'),
    resolveRoot = require('./resolveRoot'),
    mainComponent = require(resolveRoot('./app/components/main'));

var app = express();
app.set('view engine', 'ejs');
app.use('/assets', express.static(resolveRoot('./assets')));

app.get('/', function (req, res) {
  res.render('index', {
    markup: React.renderComponentToString(mainComponent())
  });
});

var server = app.listen(process.env.PORT || 8000, function() {
  console.log('Listening on port %d', server.address().port);
});

module.exports = server;

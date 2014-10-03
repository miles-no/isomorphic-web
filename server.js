'use strict';

var express = require('express');

var app = express();
app.set('view engine', 'ejs');
app.use('/assets', express.static('./.tmp/assets'));

app.get('/', function (req, res) {
  res.render('index', {
    markup: '<h1>Goodbye Angular!</h1>'
  });
});

var server = app.listen(process.env.PORT || 8000, function() {
  console.log('Listening on port %d', server.address().port);
});

module.exports = server;

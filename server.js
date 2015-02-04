'use strict';
require('dotenv').load();
require('node-jsx').install({extension: '.jsx'});

var express = require('express'),
    React = require('react'),
    mainComponent = React.createFactory(require('./app/components/Main.jsx'));

var app = express();
app.set('view engine', 'ejs');

app.use(require('./middleware/locals'));

app.use('/assets', express.static('./public/assets'));
if(process.env.NODE_ENV !== 'production'){
  app.use('/assets', express.static('./.tmp/public/assets'));
}

app.get('/', function (req, res) {
  res.render('index', {
    markup: React.renderToString(mainComponent())
  });
});

var server = app.listen(process.env.PORT || 8000, function() {
  console.log('Listening on port %d', server.address().port);
});

module.exports = server;

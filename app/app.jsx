'use strict';

var React = require('react'),
    Fluxible = require('fluxible'),
    routrPlugin = require('fluxible-plugin-routr');

var app = new Fluxible({
  appComponent: React.createFactory(require('./components/Main.jsx'))
});

app.plug(routrPlugin({
  routes: require('./routes')
}));

app.registerStore(require('./stores/ApplicationStore'));

module.exports = app;

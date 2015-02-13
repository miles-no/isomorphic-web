'use strict';

var React = require('react'),
    app = require('./app.jsx');

app.rehydrate(window.__dehydratedState, function (err, context) {
  if (err) {
    throw err;
  }

  var appComponent = app.getAppComponent(),
      mountNode = document.getElementById('app-container');

  React.withContext(context.getComponentContext(), function () {
    React.render(appComponent(), mountNode);
  });
});

'use strict';

var React = require('react'),
    mainComponent = require('./components/main');

window.addEventListener('load', function () {
  React.renderComponent(mainComponent(), document.getElementById('app-container'));
});

'use strict';

var React = require('react'),
    MainComponent = require('./components/Main.jsx');

window.addEventListener('load', function () {
  React.render(<MainComponent />, document.getElementById('app-container'));
});

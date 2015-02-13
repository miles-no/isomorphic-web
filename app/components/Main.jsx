'use strict';

var React = require('react'),
    ApplicationStore = require('../stores/ApplicationStore'),
    RouterMixin = require('flux-router-component').RouterMixin,
    FluxibleMixin = require('fluxible').Mixin;

module.exports = React.createClass({
  mixins: [RouterMixin, FluxibleMixin],

  statics: {
    storeListeners: [ApplicationStore]
  },

  getInitialState: function () {
    return this.getStore(ApplicationStore).getState();
  },

  onChange: function () {
    var state = this.getStore(ApplicationStore).getState();
    this.setState(state);
  },

  render: function () {
    return (
      <div>
        <h1>Hello Future!</h1>
      </div>
    );
  }
});

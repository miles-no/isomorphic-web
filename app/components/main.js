/** @jsx React.DOM */
'use strict';

var React = require('react'),
    clock = require('./clock');

module.exports = React.createClass({

  getInitialState: function () {
    return {
      time: Date.now()
    };
  },

  handleClick: function () {
    this.setState({time: Date.now()});
  },

  render: function () {
    return (
      <div>
        <h1>Hello Future!</h1>
        <clock time={this.state.time} />
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
});

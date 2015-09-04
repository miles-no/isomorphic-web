import React from 'react';

export default class Clock extends React.Component {
  render() {
    return <div>{this.props.time}</div>;
  }
}

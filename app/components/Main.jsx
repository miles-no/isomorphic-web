import React from 'react';
import Clock from './Clock.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: Date.now() };
  }

  render() {
    return (
      <div>
        <h1>Hello Future!</h1>
        <Clock time={this.state.time} />
        <button onClick={this.handleClick.bind(this)}>Click Me</button>
      </div>
    );
  }

  handleClick() {
    this.setState({time: Date.now()});
  }
}

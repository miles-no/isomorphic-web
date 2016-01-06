import { Component } from 'react';
import Clock from './Clock.jsx';

import './Main.scss';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { time: Date.now() };
  }

  handleClick() {
    this.setState({time: Date.now()});
  }

  render() {
    return (
      <div className="main">
        <h1>Hello Future!</h1>
        <Clock time={this.state.time} />
        <button onClick={this.handleClick.bind(this)}>Click Me</button>
      </div>
    );
  }
}

export default Main;

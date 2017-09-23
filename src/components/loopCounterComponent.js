import React from 'react';
import PropTypes from 'prop-types';

class LoopCounter extends React.Component {
  static contextTypes = {
    loop: PropTypes.object
  };

  constructor() {
    super();

    this.state = {
      counter: 0,
      isLoopRunning: true
    };

    this.toggleLoop = this.toggleLoop.bind(this);
  }

  update = () => {
    let { counter } = this.state;

    this.setState({ counter: counter + 1 });
  };

  componentDidMount() {
    this.context.loop.subscribe(this.update);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }

  toggleLoop() {
    let { isLoopRunning } = this.state;

    if (!isLoopRunning) {
      this.context.loop.start();
    } else {
      this.context.loop.stop();
    }

    this.setState({ isLoopRunning: !isLoopRunning });
  }

  render() {
    return (
      <div>
        <div>Counter: { this.state.counter }</div>
        <button onClick={this.toggleLoop}>Toggle Loop</button>
      </div>
    );
  }
}

export default LoopCounter;

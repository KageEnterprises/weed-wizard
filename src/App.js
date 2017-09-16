import React, { Component } from 'react';
import Loop from './reactGameKit/components/loop';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Loop>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <div className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </div>
        </div>
      </Loop>
    );
  }
}

export default App;

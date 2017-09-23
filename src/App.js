import React, { Component } from 'react';
import PropTypes from 'prop-types';
import weedWizard from './state/reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import InventoryContainer from './containers/inventoryContainer';

import { smokeWeed, decayHighness } from './state/actions';

//import logo from './logo.svg';
import './App.css';

let store = createStore(weedWizard);
let lastUpdate = new Date();

class App extends Component {
  static contextTypes = {
    loop: PropTypes.object
  };

  componentDidMount() {
    this.context.loop.subscribe(this.update);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }

  update = () => {
    const now = new Date();
    const timeDelta = now - lastUpdate;

    if (timeDelta > 16) {
      store.dispatch(decayHighness(timeDelta));

      lastUpdate = new Date();
    }
  };

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <h2>Weed Wizard</h2>
          </div>
          <div className="App-intro">
            {/*<LoopCounter />*/}
            <button onClick={() => { store.dispatch(smokeWeed(0, 0)); }}>Smoke Weed</button>
            <InventoryContainer />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;

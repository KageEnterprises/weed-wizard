import React, { Component } from 'react';
import PropTypes from 'prop-types';
import weedWizard from './state/reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import PlayerActionsContainer from './playerActions/playerActionsContainer';
import PlayerStatusContainer from './playerStatus/playerStatusContainer';
import NotificationsContainer from './notifications/notificationsContainer';

import { decayHighness } from './state/actions';

//import logo from './logo.svg';
import styles from './App.css';

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
        <div className={styles.app}>
          <div className={styles.appHeader}>
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <h2>Weed Wizard</h2>
          </div>
          <div className={styles.appBody}>
            <PlayerActionsContainer />
            <PlayerStatusContainer />
            <NotificationsContainer />
            <p>All weed names in this game are from or inspired by the <a href="http://weednamemaker.com/">Weed Name
              Maker</a>.</p>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;

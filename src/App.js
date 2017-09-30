import React, { Component } from 'react';
import weedWizard from './state/reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import PlayerActionsContainer from './playerActions/playerActionsContainer';
import PlayerStatusContainer from './playerStatus/playerStatusContainer';
import GardenContainer from './garden/gardenContainer';
import NotificationsContainer from './notifications/notificationsContainer';

//import logo from './logo.svg';
import styles from './App.css';

let store = createStore(weedWizard);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className={styles.app}>
          <h2 className={styles.appHeader}>Weed Wizard</h2>
          <div className={styles.appBody}>
            <PlayerActionsContainer />
            <PlayerStatusContainer />
            <GardenContainer />
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

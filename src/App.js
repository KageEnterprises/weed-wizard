import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  combineReducers,
  createStore
} from 'redux';

import GardenContainer from './garden/gardenContainer';
import garden from './garden/gardenReducers';
import NotificationsContainer from './notifications/notificationsContainer';
import notifications from './notifications/notificationsReducers';
import PlayerActionsContainer from './player/playerActionsContainer';
import PlayerContainer from './player/playerContainer';
import player from './player/playerReducers';
import settings from './settings/settingsReducers';

//import logo from './logo.svg';
import styles from './App.css';

let reducer = combineReducers({
  garden,
  notifications,
  player,
  settings
});

let store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className={styles.app}>
          <h2 className={styles.appHeader}>Weed Wizard</h2>
          <div className={styles.appBody}>
            <PlayerActionsContainer />
            <PlayerContainer />
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

import React from 'react';
import { Provider }           from 'react-redux';
import {
  combineReducers,
  createStore }               from 'redux';

import AlertsContainer        from './alerts/alertsContainer';
import alerts                 from './alerts/alertsReducers';
import game                   from './game/gameReducers';
import GardenContainer        from './garden/gardenContainer';
import garden                 from './garden/gardenReducers';
import MagicSpellsContainer   from './magic/magicSpellsContainer';
import magic                  from './magic/magicReducers';
import NotificationsContainer from './notifications/notificationsContainer';
import notifications          from './notifications/notificationsReducers';
import PlayerActionsContainer from './player/playerActionsContainer';
import PlayerContainer        from './player/playerContainer';
import player                 from './player/playerReducers';
import settings               from './settings/settingsReducers';

//import logo                 from './logo.svg';

import styles                 from './App.css';

let reducer = combineReducers({
  alerts,
  game,
  garden,
  magic,
  notifications,
  player,
  settings
});

let store = createStore(reducer);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className={styles.app}>
          <h2 className={styles.appHeader}>Weed Wizard</h2>
          <div className={styles.appBody}>
            <PlayerActionsContainer />
            <PlayerContainer />
            <MagicSpellsContainer />
            <GardenContainer />
            <NotificationsContainer />
            <AlertsContainer />
            <p>All weed names in this game are from or inspired by the <a href="http://weednamemaker.com/">Weed Name
              Maker</a>.</p>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;

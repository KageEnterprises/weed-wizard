import React                  from 'react';
import {
  Row,
  Col }                       from 'react-flexbox-grid';
import { Provider }           from 'react-redux';
import AppBar                 from 'react-toolbox/lib/app_bar';
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
        <div>
          <AppBar title='Weed Wizard' />
          <Row>
            <Col xs={12}>
              <PlayerActionsContainer />
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <PlayerContainer />
            </Col>
            <Col xs={4}>
              <MagicSpellsContainer />
            </Col>
            <Col xs={4}>
              <GardenContainer />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <NotificationsContainer />
            </Col>
          </Row>
          <AlertsContainer />
        </div>
      </Provider>
    );
  }
}

export default App;

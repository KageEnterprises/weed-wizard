import PropTypes from 'prop-types';
import React from 'react';

import { CONVERSIONS } from './utils/Constants';

export const contextPropTypes = {
  // Actions
  actions: {
    addNotification: PropTypes.func,
    agePlants: PropTypes.func,
    decayHighness: PropTypes.func,
    plantSeed: PropTypes.func,
    removePlant: PropTypes.func,
    saveState: PropTypes.func,
    selectTool: PropTypes.func,
    selectWeed: PropTypes.func,
    smokeWeed: PropTypes.func,
    startGame: PropTypes.func,
    stopGame: PropTypes.func,
    toggleGame: PropTypes.func,
    toggleSpell: PropTypes.func,
    updateTimestamp: PropTypes.func
  },
  actionsShape: PropTypes.shape({
    addNotification: PropTypes.func,
    agePlants: PropTypes.func,
    decayHighness: PropTypes.func,
    harvestPlant: PropTypes.func,
    plantSeed: PropTypes.func,
    removePlant: PropTypes.func,
    saveState: PropTypes.func,
    selectTool: PropTypes.func,
    selectWeed: PropTypes.func,
    smokeWeed: PropTypes.func,
    startGame: PropTypes.func,
    stopGame: PropTypes.func,
    toggleGame: PropTypes.func,
    updateTimestamp: PropTypes.func
  }),

  // Magic Actions
  magicActions: {
    transmute: PropTypes.func
  },

  // Game Loop
  gameIsRunning: PropTypes.bool,
  lastUpdated: PropTypes.number,
  timeSinceLastUpdate: PropTypes.number,
  loop: {
    loop: PropTypes.func.isRequired,
    start: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
    subscribers: PropTypes.arrayOf(PropTypes.func).isRequired,
    unsubscribe: PropTypes.func.isRequired,
  },
  loopShape: PropTypes.shape({
    loop: PropTypes.func.isRequired,
    start: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
    subscribers: PropTypes.arrayOf(PropTypes.func).isRequired,
    unsubscribe: PropTypes.func.isRequired,
  }),

  // Player
  player: {
    garden: PropTypes.arrayOf(PropTypes.shape({})),
    highness: PropTypes.number,
    highnessCap: PropTypes.number,
    selectedTool: PropTypes.number,
    selectedWeed: PropTypes.number,
    toolsList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number
    })),
    weedList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      quantity: PropTypes.number,
      seeds: PropTypes.number
    }))
  },
  playerShape: PropTypes.shape({
    garden: PropTypes.arrayOf(PropTypes.shape({})),
    highness: PropTypes.number,
    highnessCap: PropTypes.number,
    selectedTool: PropTypes.number,
    selectedWeed: PropTypes.number,
    toolsList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number
    })),
    weedList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      quantity: PropTypes.number,
      seeds: PropTypes.number
    }))
  }),

  // Notifications
  notificationsShape: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.any,
    key: PropTypes.number
  }))
};

export const defaultContext = {
  // Actions
  actions: {
    addNotification: () => { },
    agePlants: () => { },
    decayHighness: () => { },
    harvestPlant: () => { },
    plantSeed: () => { },
    removePlant: () => { },
    saveState: () => { },
    selectTool: () => { },
    selectWeed: () => { },
    smokeWeed: () => { },
    startGame: () => { },
    stopGame: () => { },
    toggleGame: () => { },
    toggleSpell: () => { },
    updateTimestamp: () => { }
  },

  // Magic Actions
  magicActions: {
    transmute: () => { }
  },

  // Game Loop
  gameIsRunning: false,
  lastUpdated: new Date().getTime(),
  timeSinceLastUpdate: 0,
  loop: {
    loop() { },
    start() { },
    stop() { },
    subscribe() { },
    subscribers: [],
    unsubscribe() { }
  },

  // Notifications
  notifications: [],

  // Player
  player: {
    garden: [ undefined ],
    highness: 0,
    highnessCap: 11,
    selectedTool: 0,
    selectedWeed: 0,
    spellsList: [
      {
        id: 0,
        active: false
      },
      {
        id: 1
      }
    ],
    toolsList: [
      { id: 0 }
    ],
    weedList: [
      {
        id: 0,
        quantity: CONVERSIONS.OZ_TO_G / 8, // one eighth of an ounce, in grams
        seeds: 0
      }
    ]
  }
};

const AppContext = React.createContext(defaultContext);

export default AppContext;
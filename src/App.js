import React from 'react';

import AppDisplay from './AppDisplay';

import AppContext, { defaultContext } from './AppContext';

import TransmuteDialog from './Magic/TransmuteDialog';
import { getSpellById } from './Magic/MagicUtils';
import { getToolById } from './Tools/ToolUtils';
import {
  BASE_SEED_DROP_RATE,
  BASE_TIME_PER_PLANT_GROWTH_PHASE,
  COME_DOWN_RATE,
  CONVERSIONS
} from './utils/Constants';
import GameLoop from './utils/GameLoop';
import {
  PLANT_GROWTH_PHASES,
  STRAINS } from './Weed/WeedList';
import {
  getRandomTier1Strain,
  getStrainById,
  plantAgePhaseFilter
} from './Weed/WeedUtils';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // eslint-disable-line no-unused-vars
import {
  faCannabis,
  faJoint
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faCannabis,
  faJoint
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.loop = new GameLoop();

    this.state = {
      transmuteDialogOpen: false,
      // Set context methods
      context: {
        ...defaultContext,
        actions: {
          ...defaultContext.actions,
          addNotification: this.addNotification,
          agePlants: this.agePlants,
          harvestPlant: this.harvestPlant,
          decayHighness: this.decayHighness,
          plantSeed: this.plantSeed,
          removePlant: this.removePlant,
          saveState: this.saveState,
          selectTool: this.selectTool,
          selectWeed: this.selectWeed,
          smokeWeed: this.smokeWeed,
          startGame: this.startGame,
          stopGame: this.stopGame,
          toggleGame: this.toggleGame,
          toggleSpell: this.toggleSpell,
          updateTimestamp: this.updateTimestamp
        },
        magicActions: {
          ...defaultContext.magicActions,
          transmute: this.magicTransmute
        }
      }
    };
  }

  componentWillMount() {
    const { context } = this.state;
    const { actions } = context;
    const { addNotification } = actions;

    const player = JSON.parse(localStorage.getItem('weedWizard'));

    if (player) {
      addNotification('Game loaded!');

      this.setState({
        ...this.state,
        context: {
          ...context,
          player
        }
      });
    }
  }

  componentDidMount() {
    this.loop.start();
  }

  componentWillUnmount() {
    this.loop.stop();
  }

  closeTransmuteDialog = () => {
    this.setState({
      transmuteDialogOpen: false
    });
  };

  /**
   * Context Methods
   */

  addNotification = text => {
    const { context } = this.state;
    const { notifications } = context;

    notifications.push({
      message: text,
      key: new Date().getTime()
    });

    this.setState({
      context: {
        ...context,
        notifications
      }
    });
  };

  agePlants = () => {
    const { context } = this.state;
    const {
      actions,
      gameIsRunning,
      player,
      timeSinceLastUpdate } = context;
    const { addNotification } = actions;
    const {
      garden,
      spellsList } = player;
    let timeToAge = timeSinceLastUpdate;

    // If the Grow Faster spell is active, do that
    if (spellsList.find(SPELL => SPELL.id === 0).active) timeToAge *= 60;

    const newGarden = garden.map(plant => {
      if (typeof plant === 'undefined') return plant;
      else {
        const {
          age,
          phase } = plant;
        const newAge = age + timeToAge;
        const newPhase = plantAgePhaseFilter(newAge);

        let newGrowthProgress = age / BASE_TIME_PER_PLANT_GROWTH_PHASE;
        newGrowthProgress = (newGrowthProgress - Math.floor(newGrowthProgress)) * 100;

        if (phase !== newPhase && age > 1000) addNotification((
          <span>
            {'Congratulations! Your '}
            <b>{ plant.name }</b>
            {' plant has entered a '}
            <b>{ PLANT_GROWTH_PHASES[newPhase] }</b>
            {' phase!'}
          </span>
        ));

        return {
          ...plant,
          age: newAge,
          growthProgress: newGrowthProgress,
          phase: newPhase
        };
      }
    });

    if (gameIsRunning) {
      this.setState({
        context: {
          ...context,
          player: {
            ...player,
            garden: newGarden
          }
        }
      });
    }
  };

  decayHighness = () => {
    const { state } = this;
    const { context } = state;
    const {
      actions,
      gameIsRunning,
      player,
      timeSinceLastUpdate } = context;
    const { addNotification } = actions;
    const {
      highness,
      spellsList
     } = player;

    if (gameIsRunning) {
      let reduceHighnessBy = COME_DOWN_RATE * timeSinceLastUpdate;

      spellsList.forEach(spell => {
        if (spell.active) {
          reduceHighnessBy += (getSpellById(spell.id).cost * timeSinceLastUpdate);
        }
      });

      const newSpellsList = spellsList.map(spell => {
        if (spell.active && reduceHighnessBy >= highness) {
          addNotification(<span>Your magic seems to end when you're no longer stoned!</span>);

          return {
            ...spell,
            active: false
          };
        }

          return spell;
      });

      this.setState({
        ...state,
        context: {
          ...context,
          player: {
            ...player,
            highness: Math.max(0, highness - reduceHighnessBy),
            spellsList: newSpellsList
          }
        }
      });
    }
  };

  harvestPlant = id => {
    const { context } = this.state;
    const { player } = context;
    const {
      garden,
      weedList } = player;
    let harvested = false;

    const weedToHarvest = getStrainById(garden[id].id);

    const newGarden = garden.map((gardenPlot, index) => {
      if (index === id) return undefined;
      return gardenPlot;
    });

    const newWeedList = weedList.map(WEED => {
      if (WEED.id === weedToHarvest.id) {
        harvested = true;
        return {
          ...WEED,
          quantity: WEED.quantity + CONVERSIONS.OZ_TO_G // 1 oz in grams
        };
      } else return WEED;
    });

    if (!harvested) newWeedList.push({
      id: weedToHarvest.id,
      quantity: CONVERSIONS.OZ_TO_G,
      seeds: 0
    })

    this.addNotification(<span>You have harvested a <b>{weedToHarvest.name}</b> plant!</span>);

    this.setState({
      context: {
        ...context,
        player: {
          ...player,
          garden: newGarden,
          weedList: newWeedList
        }
      }
    });
  };

  plantSeed = () => {
    const { context } = this.state;
    const {
      actions,
      player } = context;
    const { addNotification } = actions;
    const {
      garden,
      selectedWeed,
      weedList } = player;
    const weed = selectedWeed === 0 ?
      getRandomTier1Strain() :
      getStrainById(selectedWeed);
    let planted = false;

    const newWeedList = weedList
      .map(WEED => ({
        ...WEED,
        seeds: WEED.id === selectedWeed ? WEED.seeds - 1 : WEED.seeds
      }))
      .filter(WEED => WEED.quantity > 0 || WEED.seeds > 0);

    const newGarden = garden.map(PLOT => {
      if (typeof PLOT === 'undefined' && !planted) {
        planted = true;

        addNotification(selectedWeed === 0 ? (
          <span>
            Your <b>{getStrainById(0).name}</b> seed is growing into a <b>{weed.name}</b> plant!
          </span>
        ) : (
          <span>
            You planted a <b>{weed.name}</b> plant!
          </span>
        ));

        return {
          ...weed,
          age: 0,
          growthProgress: 0
        };
      } else {
        return PLOT;
      }
    });

    this.setState({
      context: {
        ...context,
        player: {
          ...player,
          garden: newGarden,
          weedList: newWeedList
        }
      }
    });
  };

  removePlant = id => {
    const { context } = this.state;
    const { player } = context;
    const { garden } = player;

    const weedToRemove = getStrainById(garden[id].id);

    const newGarden = garden.map((gardenPlot, index) => {
      if (index === id) return undefined;
      return gardenPlot;
    });

    this.addNotification(<span>You have removed a <b>{weedToRemove.name}</b> plant.</span>);

    this.setState({
      context: {
        ...context,
        player: {
          ...player,
          garden: newGarden
        }
      }
    });
  };

  saveState = (showNotification = true) => {
    const { context } = this.state;
    const {
      actions,
      player } = context;
    const { addNotification } = actions;

    localStorage.setItem('weedWizard', JSON.stringify( player ));
    if (showNotification) addNotification('Game saved!');
  };

  selectTool = id => {
    const { state } = this;
    const { context } = state;
    const {
      gameIsRunning,
      player } = context;

    if (gameIsRunning) {
      this.setState({
        ...state,
        context: {
          ...context,
          player: {
            ...player,
            selectedTool: id
          }
        }
      });
    }
  };

  selectWeed = id => {
    const { state } = this;
    const { context } = state;
    const {
      gameIsRunning,
      player } = context;

    if (gameIsRunning) {
      this.setState({
        ...state,
        context: {
          ...context,
          player: {
            ...player,
            selectedWeed: id
          }
        }
      });
    }
  };

  smokeWeed = () => {
    const { state } = this;
    const { context } = state;
    const {
      actions,
      gameIsRunning,
      player } = context;
    const {
      addNotification
    } = actions;
    const {
      highness,
      highnessCap,
      selectedTool,
      selectedWeed,
      toolsList,
      weedList
    } = player;

    const weed = {
      ...weedList.find(WEED => WEED.id === selectedWeed),
      ...getStrainById(selectedWeed)
    };

    const tool = {
      ...toolsList.find(TOOL => TOOL.id === selectedTool),
      ...getToolById(selectedTool)
    };

    const amountToSmoke = Math.min(
      weed.quantity,
      tool.size * CONVERSIONS.BOWL_TO_G
    );

    const dropSeed = Math.random() <= BASE_SEED_DROP_RATE * weed.seedDropMod;

    const newWeedList = weedList
      .map(WEED => ({
        ...WEED,
        quantity: WEED.id === selectedWeed ?
          WEED.quantity - amountToSmoke :
          WEED.quantity,
        seeds: dropSeed && WEED.id === selectedWeed ?
          WEED.seeds + 1 :
          WEED.seeds
      }))
      .filter(WEED => WEED.quantity > 0 || WEED.seeds > 0);

    if (gameIsRunning) {
      addNotification(
        <span>
          {'You smoked '}
          { weed.quantity - amountToSmoke <= 0 ? 'the last of your ' : ''}
          <b>{weed.name}</b>{' out of '}
          <b>{tool.name}</b>{ dropSeed ? ' and found a seed!' : '.'}
        </span>
      );

      this.setState({
        ...state,
        context: {
          ...context,
          player: {
            ...player,
            highness: Math.min(
              highness + (weed.highness * (amountToSmoke / CONVERSIONS.BOWL_TO_G)),
              highnessCap
            ),
            selectedWeed: newWeedList.map(WEED => WEED.id).indexOf(selectedWeed) !== -1 ? selectedWeed : null,
            weedList: newWeedList
          }
        }
      });
    }
  };

  startGame = () => {
    const { context } = this.state;

    this.setState({
      context: {
        ...context,
        gameIsRunning: true
      }
    })
  };

  stopGame = () => {
    const { context } = this.state;

    this.setState({
      context: {
        ...context,
        gameIsRunning: false
      }
    })
  };

  toggleGame = () => {
    const { context } = this.state;
    const { gameIsRunning } = context;

    this.setState({
      context: {
        ...context,
        gameIsRunning: !gameIsRunning
      }
    })
  };

  toggleSpell = spell => {
    const { context } = this.state;
    const {
      magicActions,
      player } = context;
    const {
      highness,
      spellsList } = player;
    let newHighness = highness;

    const newSpellsList = spellsList.map(SPELL => {
      if (SPELL.id === spell.id) {
        if (typeof SPELL.active !== 'undefined') {
          if (!SPELL.active) {
            this.addNotification((
              <span>
                You feel the magic course through your veins as you cast <b>{spell.name}</b>!
              </span>
            ));
          }

          return {
            ...SPELL,
            active: !SPELL.active
          };
        } else {
          // Do the spell's action
          magicActions[spell.action].call();

          this.addNotification((
            <span>
              You feel the magic course through your veins as you cast <b>{spell.name}</b>!
            </span>
          ));

          newHighness -= spell.cost;

          return SPELL;
        }
      } else return SPELL;
    });

    this.setState({
      context: {
        ...context,
        player: {
          ...player,
          highness: newHighness,
          spellsList: newSpellsList
        }
      }
    });
  };

  updateTimestamp = () => {
    const { context } = this.state;
    const { lastUpdated } = context;
    const newTime = new Date().getTime();
    const timeSinceLastUpdate = newTime - lastUpdated;

    this.setState({
      ...this.state,
      context: {
        ...context,
        lastUpdated: newTime,
        timeSinceLastUpdate
      }
    });
  };

  /**
   * Magic Actions
   */

  actuallyTransmute = id => {
    const { context } = this.state;
    const {
      actions,
      player } = context;
    const { addNotification } = actions;
    const {
      highness,
      selectedWeed,
      weedList } = player;

    let added = false, newWeedId = id;

    while (newWeedId === id) {
      newWeedId = Math.floor(Math.random() * STRAINS.length);
    }

    const fullOldWeed = {
      ...getStrainById(id),
      ...weedList.find(weed => weed.id === id)
    };

    const newWeedList = weedList
      .map(weed => {
        if (weed.id !== newWeedId) return weed;

        added = true;

        return {
          ...weed,
          quantity: weed.quantity + fullOldWeed.quantity,
          seeds: weed.seeds + fullOldWeed.seeds
        };
      })
      .filter(weed => weed.id !== id);

    if (!added) newWeedList.push({
      id: newWeedId,
      quantity: fullOldWeed.quantity,
      seeds: fullOldWeed.seeds
    });

    const spellCost = getSpellById(1).cost;

    addNotification((
      <span>
        {'Your '}
        <b>{ fullOldWeed.name }</b>
        {' has been transmuted into '}
        <b>{ getStrainById(newWeedId).name }</b>
        {'!'}
      </span>
    ));

    this.setState({
      context: {
        ...context,
        gameIsRunning: true,
        player: {
          ...player,
          highness: highness - spellCost,
          selectedWeed: selectedWeed === id ? newWeedId : selectedWeed,
          weedList: newWeedList
        }
      },
      transmuteDialogOpen: false
    });
  };

  magicTransmute = () => {
    const { context } = this.state;

    this.setState({
      transmuteDialogOpen: true
    }, () => {
      this.setState({
        context: {
          ...context,
          gameIsRunning: false,
        }
      })
    });
  };

  render() {
    const { transmuteDialogOpen } = this.state;

    return (
      <AppContext.Provider
        value={ {
          ...this.state.context,
          loop: this.loop
        } }>
        <AppContext.Consumer>
          { context => (
            <div>
              <AppDisplay
                context={ context } />
              <TransmuteDialog
                actuallyTransmute={ this.actuallyTransmute }
                closeDialog={ this.closeTransmuteDialog }
                open={ transmuteDialogOpen } />
            </div>
          ) }
        </AppContext.Consumer>
      </AppContext.Provider>
    );
  }
}

export default App;
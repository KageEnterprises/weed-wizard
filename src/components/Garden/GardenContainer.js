import React from 'react';

import AppContext from '../../AppContext';
import GardenDisplay from './GardenDisplay';

export default class GardenContainer extends React.Component {
  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <GardenDisplay
            agePlants={ context.actions.agePlants }
            garden={ context.player.garden }
            harvestPlant={ context.actions.harvestPlant }
            loop={ context.loop }
            removePlant={ context.actions.removePlant } />
        )}
      </AppContext.Consumer>
    );
  }
}
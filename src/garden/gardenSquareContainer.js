import PropTypes              from 'prop-types';
import React                  from 'react';

import GardenSquareComponent  from './gardenSquareComponent';

class GardenSquareContainer extends React.Component {
  static propTypes = {
    gameIsRunning: PropTypes.bool,
    plant: PropTypes.object,

    agePlant: PropTypes.func,
    harvestPlant: PropTypes.func,
    removePlant: PropTypes.func,
    sendNotification: PropTypes.func
  };

  render() {
    return (
      <GardenSquareComponent
        {...this.props} />
    );
  }
}

export default GardenSquareContainer;

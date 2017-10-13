import React from 'react';
import PropTypes from 'prop-types';

import GardenSquareComponent from './gardenSquareComponent';

class GardenSquareContainer extends React.Component {
  static propTypes = {
    plant: PropTypes.object,

    agePlant: PropTypes.func,
    harvestPlant: PropTypes.func,
    sendNotification: PropTypes.func
  };

  render() {
    return (
      <GardenSquareComponent
        plant={this.props.plant}
        agePlant={this.props.agePlant}
        harvestPlant={this.props.harvestPlant}
        sendNotification={this.props.sendNotification} />
    );
  }
}

export default GardenSquareContainer;

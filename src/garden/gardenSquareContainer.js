import React from 'react';
import PropTypes from 'prop-types';

import GardenSquareComponent from './gardenSquareComponent';

class GardenSquareContainer extends React.Component {
  static propTypes = {
    plant: PropTypes.object
  };

  render() {
    return (
      <GardenSquareComponent plant={this.props.plant} />
    );
  }
}

export default GardenSquareContainer;

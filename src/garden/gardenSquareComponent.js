import React from 'react';
import PropTypes from 'prop-types';

import styles from './gardenSquare.css';

class GardenSquare extends React.Component {
  static propTypes = {
    plant: PropTypes.object
  };

  renderDetails = () => {
    return (
      <b>{this.props.plant.label}</b>
    );
  };

  render() {
    return (
      <div className={styles.gardenSquare}>
        {this.props.plant
          ? this.renderDetails()
          : `This space is empty.`}
      </div>
    );
  }
}

export default GardenSquare;

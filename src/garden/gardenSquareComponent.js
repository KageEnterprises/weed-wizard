import React from 'react';
import PropTypes from 'prop-types';

import styles from './gardenSquare.css';

class GardenSquare extends React.Component {
  static propTypes = {
    plant: PropTypes.object
  };

  render() {
    return (
      <div className={styles.gardenSquare}>
        {this.props.plant
          ? `Sort this out in a later ticket.`
          : `This space is empty.`}
      </div>
    );
  }
}

export default GardenSquare;

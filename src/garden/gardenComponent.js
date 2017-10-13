import React from 'react';
import PropTypes from 'prop-types';
import GardenSquareContainer from './gardenSquareContainer';

import styles from './garden.css';

class GardenComponent extends React.Component {
  static propTypes = {
    garden: PropTypes.array,

    agePlant: PropTypes.func,
    harvestPlant: PropTypes.func,
    sendNotification: PropTypes.func
  };

  render() {
    return (
      <div className={styles.garden}>
        <h3>Garden</h3>
        <div className={styles.field}>
          {this.props.garden.map((plant, idx) => (
            <GardenSquareContainer
              key={idx}
              plant={plant}
              agePlant={this.props.agePlant}
              harvestPlant={this.props.harvestPlant}
              sendNotification={this.props.sendNotification} />
          ))}
        </div>
      </div>
    );
  }
}

export default GardenComponent;

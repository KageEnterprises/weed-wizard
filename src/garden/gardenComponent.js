import PropTypes              from 'prop-types';
import React                  from 'react';

import GardenSquareContainer  from './gardenSquareContainer';

import styles                 from './garden.css';

class GardenComponent extends React.Component {
  static propTypes = {
    activeSpells: PropTypes.array,
    gameIsRunning: PropTypes.bool,
    garden: PropTypes.array,

    agePlant: PropTypes.func,
    harvestPlant: PropTypes.func,
    removePlant: PropTypes.func,
    sendNotification: PropTypes.func,
    updatePlant: PropTypes.func
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
              {...this.props} />
          ))}
        </div>
      </div>
    );
  }
}

export default GardenComponent;

import PropTypes              from 'prop-types';
import React                  from 'react';
import {
  Card,
  CardText,
  CardTitle }                 from 'react-toolbox/lib/card';

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
      <Card>
        <CardTitle
          title='Garden' />
        <CardText className={styles.flex}>
          {this.props.garden.map((plant, idx) => (
            <GardenSquareContainer
              key={idx}
              plant={plant}
              {...this.props} />
          ))}
        </CardText>
      </Card>
    );
  }
}

export default GardenComponent;

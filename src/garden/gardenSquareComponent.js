import React from 'react';
import PropTypes from 'prop-types';
import { plantAgeFilter } from '../utils/weedUtils';
import Button from '../components/button';

import styles from './gardenSquare.css';

class GardenSquare extends React.Component {
  static propTypes = {
    plant: PropTypes.object,
    agePlant: PropTypes.func,
    harvestPlant: PropTypes.func
  };

  static contextTypes = {
    loop: PropTypes.object
  };

  componentDidMount() {
    this.context.loop.subscribe(this.loopUpdate);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopUpdate);
  }

  loopUpdate = () => {
    if (this.props.plant) {
      this.props.agePlant(this.props.plant);
    }
  };

  renderDetails = () => {
    const plantAge = plantAgeFilter(this.props.plant.plantAge);

    return (
      <div>
        <p className={styles.strainLabel}>
          {this.props.plant.label}
        </p>
        <p>
          <span>{plantAge}</span>
        </p>
        {plantAge === 'Mature'
          ? <Button
              label='Harvest'
              tooltip='Click to harvest this plant'
              onClick={() => {this.props.harvestPlant(this.props.plant)}}
            />
          : null}
      </div>
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

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/button';

import styles from './gardenSquare.css';

class GardenSquare extends React.Component {
  static propTypes = {
    plant: PropTypes.object,

    agePlant: PropTypes.func,
    harvestPlant: PropTypes.func,
    sendNotification: PropTypes.func
  };

  static contextTypes = {
    loop: PropTypes.object
  };

  componentDidMount() {
    this.context.loop.subscribe(this.loopUpdate);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.plant) {
      if (newProps.plant.phase !== this.props.plant.phase) {
        this.props.sendNotification(`Your ${this.props.plant.label} has become ${newProps.plant.phase}!`);
      }
    }
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
    const { plant } = this.props;

    return (
      <div>
        <p className={styles.strainLabel}>
          {plant.label}
        </p>
        <p>
          <span>{plant.phase}</span>
        </p>
        {plant.phase === 'Mature'
          ? <Button
              label='Harvest'
              tooltip='Click to harvest this plant'
              onClick={() => {this.props.harvestPlant(plant)}}
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

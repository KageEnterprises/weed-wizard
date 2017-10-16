import PropTypes  from 'prop-types';
import React      from 'react';

import Button     from '../components/button';

import styles     from './gardenSquare.css';

class GardenSquare extends React.Component {
  static propTypes = {
    gameIsRunning: PropTypes.bool,
    plant: PropTypes.object,

    agePlant: PropTypes.func,
    harvestPlant: PropTypes.func,
    removePlant: PropTypes.func,
    sendNotification: PropTypes.func
  };

  static contextTypes = {
    loop: PropTypes.object
  };

  componentDidMount() {
    this.context.loop.subscribe(this.loopUpdate);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.plant && newProps.plant) {
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
      if (this.props.gameIsRunning) {
        this.props.agePlant(this.props.plant);
      }
      this.props.updatePlant(this.props.plant);
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
              onClick={() => {this.props.harvestPlant(plant);}}
            />
          : null}
        <Button
          label='Remove plant'
          tooltip='Click to remove this plant without harvesting it'
          onClick={() => {this.props.removePlant(plant);}}/>
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

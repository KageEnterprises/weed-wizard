import PropTypes  from 'prop-types';
import React      from 'react';

import Button     from '../components/button';

import styles     from './gardenSquare.css';

let lastLoop = new Date();

class GardenSquare extends React.Component {
  static propTypes = {
    activeSpells: PropTypes.array,
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
    const now = new Date();

    if (now - lastLoop > 16) {
      if (this.props.plant) {
        if (this.props.gameIsRunning) {
          let ageDiff = now - this.props.plant.lastUpdated;
          // Check for Grow Faster, Dammit! spell
          if (this.props.activeSpells.indexOf(0) > -1) {
            ageDiff *= 40;
          }
          console.log('ageDiff', ageDiff);
          this.props.agePlant(this.props.plant, ageDiff);
        }
        this.props.updatePlant(this.props.plant, now);
      }
      lastLoop = new Date();
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

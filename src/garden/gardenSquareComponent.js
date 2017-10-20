import PropTypes  from 'prop-types';
import React      from 'react';
import {
  Card,
  CardText,
  CardTitle }     from 'react-toolbox/lib/card';
import Tooltip    from 'react-toolbox/lib/tooltip';

import { Button } from 'react-toolbox/lib/button';

import styles     from './gardenSquare.css';

let lastLoop = new Date();

const TooltipButton = Tooltip(Button);

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
          this.props.agePlant(this.props.plant, ageDiff);
        }
        this.props.updatePlant(this.props.plant, now);
      }
      lastLoop = new Date();
    }
  };

  renderDetails = () => {
    const { plant } = this.props;

    return [
      <CardTitle
        key='title'
        theme={styles}
        title={plant.label}
        subtitle={plant.phase} />,
      <CardText
        theme={styles}
        key='actions'>
        {plant.phase === 'Mature' ?
          <TooltipButton
            primary floating mini
            theme={styles}
            label='Harvest'
            tooltip='Click to harvest this plant'
            tooltipDelay={250}
            onClick={() => {this.props.harvestPlant(plant);}} />
          : null}
        <TooltipButton
          primary floating mini
          theme={styles}
          label='Remove'
          tooltip='Click to remove this plant without harvesting it'
          tooltipDelay={250}
          onClick={() => {this.props.removePlant(plant);}} />
      </CardText>
    ];
  };

  render() {
    return (
      <Card
        theme={styles}
        className={this.props.plant && this.props.plant.phase === 'Mature' ? styles.mature : ''}>
        {this.props.plant ?
          this.renderDetails() :
          <CardText theme={styles}>Just dirt!</CardText> }
      </Card>
    );
  }
}

export default GardenSquare;

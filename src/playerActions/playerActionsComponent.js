import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/button';

import styles from './playerActions.css';

class PlayerActionsComponent extends React.Component {
  static propTypes = {
    selectedWeed: PropTypes.object,
    selectedTool: PropTypes.object,
    emptyGardenSpace: PropTypes.bool,

    onSmokeWeed: PropTypes.func,
    onPlantSeed: PropTypes.func
  };

  render() {
    return (
      <div className={styles.playerActions}>
        {this.props.selectedWeed.quantity > 0 && this.props.selectedTool
          ? <Button
              label="Smoke Weed"
              onClick={() => {
                this.props.onSmokeWeed(this.props.selectedWeed, this.props.selectedTool);
              }}
              tooltip={`Click to smoke ${this.props.selectedWeed.label} from your ${this.props.selectedTool.label}.`} />
          : null}
        {this.props.selectedWeed.seeds > 0 && this.props.emptyGardenSpace
          ? <Button
              label="Plant a Seed"
              onClick={() => {
                this.props.onPlantSeed(this.props.selectedWeed);
              }}
              tooltip={`Click to plant a ${this.props.selectedWeed.label} seed in your garden.`} />
          : null}
      </div>
    );
  }
}

export default PlayerActionsComponent;

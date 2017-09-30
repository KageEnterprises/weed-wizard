import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/button';

import styles from './playerActions.css';

class PlayerActionsComponent extends React.Component {
  static propTypes = {
    selectedWeed: PropTypes.object,
    selectedTool: PropTypes.object,

    onSmokeWeed: PropTypes.func
  };

  render() {
    return (
      <div className={styles.playerActions}>
        {this.props.selectedWeed.quantity > 0 && this.props.selectedTool
          ? <Button
              onClick={() => {
                this.props.onSmokeWeed(this.props.selectedWeed, this.props.selectedTool);
              }}
              label="Smoke Weed" />
          : null}
      </div>
    );
  }
}

export default PlayerActionsComponent;

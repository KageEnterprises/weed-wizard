import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/button';

import styles from './playerActions.css';

class PlayerActionsComponent extends React.Component {
  static propTypes = {
    hasWeed: PropTypes.bool,
    selectedWeed: PropTypes.object,
    selectedTool: PropTypes.object,

    onSmokeWeed: PropTypes.func
  };

  render() {
    return (
      <div className={styles.playerActions}>
        {this.props.hasWeed
          ? <Button
              onClick={() => {
                this.props.onSmokeWeed(this.props.selectedWeed.id, this.props.selectedTool.id);
              }}
              label="Smoke Weed" />
          : null}
      </div>
    );
  }
}

export default PlayerActionsComponent;

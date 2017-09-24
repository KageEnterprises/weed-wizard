import React from 'react';
import PropTypes from 'prop-types';

import './playerActions.css';

class PlayerActionsComponent extends React.Component {
  static propTypes = {
    hasWeed: PropTypes.bool,
    selectedWeed: PropTypes.object,
    selectedTool: PropTypes.object,

    onSmokeWeed: PropTypes.func
  };

  render() {
    return (
      <div className="playerActions">
        {this.props.hasWeed
          ? <button onClick={() => {
              this.props.onSmokeWeed(this.props.selectedWeed.id, this.props.selectedTool.id);
            }}>Smoke Weed</button>
          : null}
      </div>
    );
  }
}

export default PlayerActionsComponent;

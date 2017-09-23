import React from 'react';
import PropTypes from 'prop-types';

import './playerActions.css';

class PlayerActionsComponent extends React.Component {
  static propTypes = {
    hasWeed: PropTypes.bool,
    onSmokeWeed: PropTypes.func
  };

  render() {
    return (
      <div className="playerActions">
        {this.props.hasWeed
          ? <button onClick={() => { this.props.onSmokeWeed(0, 0); }}>Smoke Weed</button>
          : null}
      </div>
    );
  }
}

export default PlayerActionsComponent;

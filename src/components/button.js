import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func
  };

  render() {
    return (
      <button onClick={this.props.onClick}>{this.props.label}</button>
    );
  }
}

export default Button;

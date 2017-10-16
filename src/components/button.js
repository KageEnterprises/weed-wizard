import PropTypes  from 'prop-types';
import React      from 'react';

class Button extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    tooltip: PropTypes.string
  };

  render() {
    return (
      <button
        title={this.props.tooltip}
        onClick={this.props.onClick}>{this.props.label}</button>
    );
  }
}

export default Button;

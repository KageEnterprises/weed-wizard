import React from 'react';
import PropTypes from 'prop-types';

import styles from './components.css';

class ItemListItem extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    description: PropTypes.string,
    selected: PropTypes.bool,
    onClick: PropTypes.func
  };

  render() {
    return (
      <div
        className={this.props.selected ? styles.itemListItemSelected : styles.itemListItem}
        onClick={() => { this.props.onClick(); }}>
        <p>
          <b>{this.props.label}:</b>
          <i>{this.props.description}</i>
        </p>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default ItemListItem;

import PropTypes  from 'prop-types';
import React      from 'react';

import styles     from './components.css';

class ItemListItem extends React.Component {
  static propTypes = {
    description: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
    selected: PropTypes.bool
  };

  render() {
    return (
      <div
        className={this.props.selected ? styles.itemListItemSelected : styles.itemListItem}
        onClick={() => { this.props.onClick(); }}>
        <p>
          <b>{this.props.label}:</b> <i>{this.props.description}</i>
        </p>
        {this.props.children ?
          <div>{this.props.children}</div> :
          null}
      </div>
    );
  }
}

export default ItemListItem;

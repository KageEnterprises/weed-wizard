import React from 'react';
import PropTypes from 'prop-types';

import styles from './components.css';

class ItemList extends React.Component {
  static propTypes = {
    header: PropTypes.string,
    list: PropTypes.array,
    before: PropTypes.node,
    after: PropTypes.node
  };

  render() {
    return (
      <div className={styles.itemList}>
        <h3 className={styles.itemListHeader}>{this.props.header}</h3>
        {this.props.before ? this.props.before : null}
        {this.props.list}
        {this.props.after ? this.props.after : null}
      </div>
    );
  }
}

export default ItemList;

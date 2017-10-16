import PropTypes  from 'prop-types';
import React      from 'react';

import styles     from './components.css';

class ItemList extends React.Component {
  static propTypes = {
    after: PropTypes.node,
    before: PropTypes.node,
    header: PropTypes.string,
    list: PropTypes.array
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

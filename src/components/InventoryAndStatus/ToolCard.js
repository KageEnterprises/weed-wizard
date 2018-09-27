import PropTypes from 'prop-types';
import React from 'react';

import {
  Checkbox,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { listStyles } from '../../sharedStyles';

const styles = {
  card: {
    maxWidth: 275,
  },
  quantity: {
    marginBottom: 12
  }
};

class ToolCard extends React.Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    select: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired
  };

  render() {
    const {
      classes,
      description,
      name,
      select,
      selected
    } = this.props;

    return (
      <ListItem
        button
        classes={ {
          root: classes.listItem__root
        } }
        onClick={ select } >
        <Checkbox
          checked={ selected }
          classes={{
            root: classes.checkbox__root
          }}
          onClick={ () => { } } />
        <ListItemText
          classes={ {
            root: classes.listItemText__root,
            secondary: classes.listItemText__secondary
          } }
          primary={ name }
          secondary={ description } />
      </ListItem>
    );
  }
}

export default withStyles({
  ...styles,
  ...listStyles
})(ToolCard);
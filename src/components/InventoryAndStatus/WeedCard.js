import PropTypes from 'prop-types';
import React from 'react';
import NumberFormat from 'react-number-format';

import {
  Checkbox,
  Chip,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { listStyles } from '../../sharedStyles';

class WeedCard extends React.Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    seeds: PropTypes.number.isRequired,
    select: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired
  };

  render() {
    const {
      classes,
      description,
      name,
      quantity,
      seeds,
      select,
      selected
    } = this.props;

    return (
      <ListItem
        button
        classes={ {
          root: classes.listItem__root
        } }
        onClick={ select }>
        <Checkbox
          checked={ selected }
          classes={ {
            root: classes.checkbox__root
          } } />
        <ListItemText
          classes={ {
            root: classes.listItemText__root,
            secondary: classes.listItemText__secondary
          } }
          primary={ name }
          secondary={ description } />
        <div>
          <NumberFormat
            decimalScale={ 1 }
            displayType={ 'text' }
            renderText={ value => (
              <Chip
                classes={ {
                  label: classes.chip__label,
                  root: classes.chip__root
                } }
                label={ value } />
            ) }
            suffix={ ' g' }
            value={ quantity } />
          <NumberFormat
            decimalScale={ 0 }
            displayType={ 'text' }
            renderText={ value => (
              <Chip
                classes={ {
                  label: classes.chip__label,
                  root: classes.chip__root
                } }
                label={ `${value} seed${value !== '1' ? 's' : ''}` } />
            ) }
            value={ seeds } />
        </div>
      </ListItem>
    );
  }
}

export default withStyles(listStyles)(WeedCard);
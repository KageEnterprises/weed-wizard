import PropTypes from 'prop-types';
import React from 'react';
import NumberFormat from 'react-number-format';

import {
  Card,
  CardContent,
  Checkbox,
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import { contextPropTypes } from '../../AppContext';
import { getSpellById } from '../../Magic/MagicUtils';
import { listStyles } from '../../sharedStyles';

const styles = {
  body2: {
    '& .right': {
      float: 'right'
    }
  }
};

class MagicDisplay extends React.Component {
  static propTypes = {
    player: contextPropTypes.playerShape,
    toggleSpell: PropTypes.func
  };

  spellIsDisabled = spell => {
    return this.props.player.highness <= spell.cost;
  };

  spellListMapping = (spell, classes) => {
    const { toggleSpell } = this.props;
    const active = spell.type === 'passive' ? spell.active : false;

    return (
      <ListItem
        key={ spell.id }
        button
        classes={ {
          root: classes.listItem__root
        } }
        disabled={ this.spellIsDisabled(spell) }
        onClick={ () => { toggleSpell(spell) } }>
        {spell.type === 'passive' && (
          <Checkbox
            checked={ active }
            classes={{
              root: classes.checkbox__root
            }}
            onClick={ () => { } } />
        ) }
        <ListItemText
          classes={ {
            root: classes.listItemText__root,
            secondary: classes.listItemText__secondary
          } }
          primary={ spell.name }
          secondary={ spell.description } />
        <div>
          <NumberFormat
            decimalScale={ 2 }
            displayType='text'
            value={ spell.type === 'passive' ? spell.cost * 1000 : spell.cost }
            suffix={ spell.type === 'passive' ? '/s' : '' }
            renderText={ value => (
              <Chip
                classes={ {
                  label: classes.chip__label,
                  root: classes.chip__root
                } }
                label={ value } />
            )}
          />
        </div>
      </ListItem>
    );
  };

  render() {
    const {
      classes,
      player } = this.props;
    const { spellsList } = player;

    const fullSpellsList = spellsList.map(SPELL => {
      return {
        ...getSpellById(SPELL.id),
        ...SPELL
      };
    } );
    const actionSpellsList = fullSpellsList
      .filter(SPELL => SPELL.type === 'action')
      .map(SPELL => this.spellListMapping(SPELL, classes) );
    const passiveSpellsList = fullSpellsList
      .filter(SPELL => SPELL.type === 'passive')
      .map(SPELL => this.spellListMapping(SPELL, classes) );

    return (
      <Card>
        <CardContent>
          <Typography
            variant="headline">
            Magic!
          </Typography>
          <Typography
            variant="subheading">
            Spells You Know
          </Typography>
          <Typography
            classes={{ body2: classes.body2 }}
            variant="body2">
            Passive Spells
            <span className="right">Cost</span>
          </Typography>
          <List>
            { passiveSpellsList }
          </List>
          <Typography
            classes={{ body2: classes.body2 }}
            variant="body2">
            Action Spells
            <span className="right">Cost</span>
          </Typography>
          <List>
            { actionSpellsList }
          </List>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles({
  ...listStyles,
  ...styles
})(MagicDisplay);
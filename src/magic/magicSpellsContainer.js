import { connect }            from 'react-redux';

import { addAlert }           from '../alerts/alertsActions';
import {
  castSpell,
  deactivateSpell }           from './magicActions';
import MagicSpellsComponent   from './magicSpellsComponent';
import { getSpellById }       from './magicUtils';
import { addNotification }    from '../notifications/notificationsActions';

const mapStateToProps = state => {
  const spellsYouKnow = state.magic.spellsYouKnow.map((spell) => {
    const spellProps = getSpellById(spell.id);

    return {
      ...spell,
      ...spellProps
    };
  });

  return {
    playerHighness: state.player.highness,
    spellsYouKnow
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAlert: (header, content) => {
      dispatch(addAlert(header, content));
    },

    addNotification: (message) => {
      dispatch(addNotification(message));
    },

    castSpell: (spell) => {
      dispatch(castSpell(spell));
    },

    deactivateSpell: (spell) => {
      dispatch(deactivateSpell(spell));
    }
  };
};

const MagicSpellsContainer = connect(mapStateToProps, mapDispatchToProps)(MagicSpellsComponent);

export default MagicSpellsContainer;

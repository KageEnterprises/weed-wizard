import PropTypes    from 'prop-types';
import React        from 'react';

import ItemList     from '../components/itemList';
import ItemListItem from '../components/itemListItem';

import styles       from './magic.css';

class MagicSpellsComponent extends React.Component {
  static propTypes = {
    playerHighness: PropTypes.number,
    spellsYouKnow: PropTypes.array,

    addAlert: PropTypes.func,
    addNotification: PropTypes.func,
    castSpell: PropTypes.func,
    deactivateSpell: PropTypes.func
  };

  componentDidMount() {
    if (this.props.playerHighness <= 0) {
      this.deactivateAllSpells();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.playerHighness <= 0) {
      this.deactivateAllSpells();
    }
  }

  deactivateAllSpells() {
    this.props.spellsYouKnow.forEach(spell => {
      if (spell.active) {
        this.props.deactivateSpell(spell);
      }
    });
  }

  toggleSpell(spell) {
    if (spell.active) {
      this.props.deactivateSpell(spell);
    } else if (this.props.playerHighness > 0) {
      this.props.castSpell(spell);
      this.props.addNotification(
        <span>You feel the magic course through you as you cast <b>{spell.name}</b>!</span>
      );
    } else {
      this.props.addAlert('Nothing Happens',
        <div><p>For some reason, your magic only works when you're high!</p></div>);
    }
  }

  renderSpellList() {
    const spells = this.props.spellsYouKnow.map((spell, idx) => {

      return (
        <ItemListItem
          key={idx}
          label={spell.name}
          description={spell.description}
          selected={spell.active}
          onClick={() => { this.toggleSpell(spell); }} />
      );
    });

    return (
      <ItemList
        header={`Magic Spells You Know`}
        list={spells} />
    );
  }

  render() {
    return (
      <div className={styles.magicSpells}>
        {this.renderSpellList()}
      </div>
    );
  }
}

export default MagicSpellsComponent;

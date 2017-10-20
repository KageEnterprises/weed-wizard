import PropTypes        from 'prop-types';
import React            from 'react';
import {
  Card,
  CardTitle,
  CardText }            from 'react-toolbox/lib/card';
import {
  List,
  ListItem,
  ListSubHeader }       from 'react-toolbox/lib/list';

import componentStyles  from '../components/components.css';

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
        <ListItem
          key={idx}
          caption={spell.name}
          legend={spell.description}
          className={spell.active ? componentStyles.selectedItem : null}
          onClick={() => { this.toggleSpell(spell); }} />
      );
    });

    return (
      <List
        selectable={true} >
        <ListSubHeader caption='Magic Spells You Know' />
        {spells}
      </List>
    );
  }

  render() {
    return (
      <Card>
        <CardTitle
          title='Magic!' />
        <CardText>
          {this.renderSpellList()}
        </CardText>
      </Card>
    );
  }
}

export default MagicSpellsComponent;

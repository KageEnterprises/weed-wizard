import {
  CAST_SPELL,
  DEACTIVATE_SPELL }  from './magicActions';
import MagicState     from './magicState';

export default function magic(state = MagicState, action = null) {
  switch (action.type) {
    case CAST_SPELL:
      return {
        ...state,
        spellsYouKnow: state.spellsYouKnow.map(spell => {
          if (spell.id === action.spell.id) {
            return {
              ...spell,
              active: true
            };
          }
          return spell;
        })
      };

    case DEACTIVATE_SPELL:
      return {
        ...state,
        spellsYouKnow: state.spellsYouKnow.map(spell => {
          if (spell.id === action.spell.id) {
            return {
              ...spell,
              active: false
            };
          }
          return spell;
        })
      };

    default:
      return state;
  }
}

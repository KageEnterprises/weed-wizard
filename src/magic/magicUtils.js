import {
  SPELLS_LIST
} from './SpellsList';

export const getSpellById = id => {
  return SPELLS_LIST.find(SPELL => SPELL.id === id);
};
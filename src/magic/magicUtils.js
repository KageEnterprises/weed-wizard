import { SPELLS } from './magicConstants';

export const getSpellById = spellId => {
  let res;

  if (SPELLS[spellId].id === spellId) {
    return SPELLS[spellId];
  }

  SPELLS.forEach((spell) => {
    if (spell.id === spellId) {
      res = spell;
    }
  });

  return res;
};

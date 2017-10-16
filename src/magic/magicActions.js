export const CAST_SPELL = 'CAST_SPELL';
export const DEACTIVATE_SPELL = 'DEACTIVATE_SPELL';

export function castSpell (spell) {
  return {
    type: CAST_SPELL,
    spell
  };
}

export function deactivateSpell (spell) {
  return {
    type: DEACTIVATE_SPELL,
    spell
  };
}

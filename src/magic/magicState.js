const MagicState = {
  maxActiveSpells: 1, // Maximum number of spells you can have active at once
  spellsYouKnow: [{ // An array of spells you know
    id: 0, // An index for the SPELLS list in magicConstants
    active: false // If the spell is currently active
  }]
};

export default MagicState;

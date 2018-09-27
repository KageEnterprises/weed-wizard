import React from 'react';

import AppContext from '../../AppContext';
import MagicDisplay from './MagicDisplay';

const MagicContainer = () => (
  <AppContext.Consumer>
    {context => (
      <MagicDisplay
        player={ context.player }
        toggleSpell={ context.actions.toggleSpell } />
    )}
  </AppContext.Consumer>
);

export default MagicContainer;
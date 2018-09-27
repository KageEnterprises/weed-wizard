import React from 'react';

import AppContext from '../../AppContext';

import Display from './InventoryAndStatusDisplay';

export default class InventoryAndStatus extends React.Component {
  render() {
    return (
      <AppContext.Consumer>
        { context => {
          const {
            actions,
            loop,
            player } = context;

          return (
            <Display
              actions={ actions }
              loop={ loop }
              player={ player } />
          );
        } }
      </AppContext.Consumer>
    );
  }
}
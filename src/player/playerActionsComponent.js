import PropTypes  from 'prop-types';
import React      from 'react';
import { Button } from 'react-toolbox/lib/button';
import Navigation from 'react-toolbox/lib/navigation';
import Tooltip    from 'react-toolbox/lib/tooltip';

import playerActionStyles from './playerActions.css';

const TooltipButton = Tooltip(Button);

class PlayerActionsComponent extends React.Component {
  static propTypes = {
    emptyGardenSquare: PropTypes.bool,
    selectedTool: PropTypes.object,
    selectedWeed: PropTypes.object,

    onPlantSeed: PropTypes.func,
    onSmokeWeed: PropTypes.func,
    openBuySell: PropTypes.func,
    pauseGame: PropTypes.func
  };

  render() {
    const {
      emptyGardenSquare,
      onPlantSeed,
      onSmokeWeed,
      pauseGame,
      selectedTool,
      selectedWeed
      } = this.props;
    const smokeEnabled = !!(selectedTool && selectedWeed.quantity && selectedWeed.quantity > 0);
    const plantEnabled = !!(emptyGardenSquare && selectedWeed.seeds && selectedWeed.seeds > 0);

    return (
      <Navigation theme={playerActionStyles}>
        <TooltipButton
          label='Smoke Weed'
          raised={smokeEnabled}
          primary={smokeEnabled}
          disabled={!smokeEnabled}
          tooltip={`Click to smoke ${selectedWeed.label} from your ${selectedTool.label}.`}
          tooltipDelay={250}
          onClick={() => { onSmokeWeed(selectedWeed, selectedTool); }} />
        <TooltipButton
          label='Plant a Seed'
          raised={plantEnabled}
          primary
          disabled={!plantEnabled}
          tooltip={`Click to plant a ${selectedWeed.label} seed in your garden.`}
          tooltipDelay={250}
          onClick={() => { onPlantSeed(selectedWeed); }} />
        <TooltipButton
          label='Pause Game'
          raised primary
          tooltip='Click to, uh, pause the game'
          tooltipDelay={250}
          onClick={() => { pauseGame(); }} />
        <TooltipButton
          label="Buy / Sell"
          raised primary
          tooltip='Click to open the buy / sell screen and MAKE OR SPEND SOME $$$, WOO!!!'
          tooltipDelay={250}
          onClick={() => { this.props.openBuySell() }} />
      </Navigation>
    );
  }
}

export default PlayerActionsComponent;

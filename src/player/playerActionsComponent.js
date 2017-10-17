import PropTypes  from 'prop-types';
import React      from 'react';
import { Button } from 'react-toolbox/lib/button';
import Navigation from 'react-toolbox/lib/navigation';
import Tooltip    from 'react-toolbox/lib/tooltip';

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

    return (
      <Navigation>
        <TooltipButton
          label='Smoke Weed'
          raised primary
          disabled={!selectedTool || !selectedWeed.quantity || selectedWeed.quantity <= 0}
          tooltip={`Click to smoke ${selectedWeed.label} from your ${selectedTool.label}.`}
          tooltipDelay={250}
          onClick={() => { onSmokeWeed(selectedWeed, selectedTool); }} />
        <TooltipButton
          label='Plant a Seed'
          raised primary
          disabled={!emptyGardenSquare || !selectedWeed.seeds || selectedWeed.seeds <= 0}
          tooltip={`Click to plant a ${selectedWeed.label} seed in your garden.`}
          tooltipDelay={250}
          onClick={() => { onPlantSeed(selectedWeed); }} />
        <TooltipButton
          label='Pause Game'
          raised primary
          tooltip='Click to, uh, pause the game'
          tooltipDelay={250}
          onClick={() => { pauseGame(); }} />
        <Button
          label="Buy/Sell"
          onClick={() => { this.props.openBuySell() }} />
      </Navigation>
    );
  }
}

export default PlayerActionsComponent;

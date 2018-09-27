import React from 'react';
import NumberFormat from 'react-number-format';

import {
  Avatar,
  Card,
  CardContent,
  Chip,
  List,
  Typography
} from '@material-ui/core';

import ToolCard from './ToolCard';
import WeedCard from './WeedCard';

import { contextPropTypes } from '../../AppContext';
import { getToolById } from '../../Tools/ToolUtils';
import { getStrainById } from '../../Weed/WeedUtils';

export default class InventoryAndStatusDisplay extends React.Component {
  static propTypes = {
    actions: contextPropTypes.actionsShape,
    loop: contextPropTypes.loopShape,
    player: contextPropTypes.playerShape
  };

  componentDidMount() {
    const {
      actions,
      loop } = this.props;
    const { decayHighness } = actions;

    this.callbackId = loop.subscribe(() => {
      decayHighness.call();
    });
  }

  componentWillUnmount() {
    this.props.context.loop.unsubscribe(this.callbackId);
  }

  render() {
    const {
      actions,
      player
    } = this.props;
    const {
      selectTool,
      selectWeed
    } = actions;
    const {
      highness,
      selectedTool,
      selectedWeed,
      toolsList,
      weedList } = player;

    const toolCards = toolsList.map(TOOL => {
      const tool = getToolById(TOOL.id);

      return (
        <ToolCard
          key={ TOOL.id }
          { ...TOOL }
          { ...tool }
          select={ () => { selectTool(TOOL.id); } }
          selected={ selectedTool === TOOL.id } />
      );
    });

    const weedCards = weedList.map(WEED => {
      const weed = getStrainById(WEED.id);

      return (
        <WeedCard
          key={ WEED.id }
          { ...WEED }
          { ...weed }
          select={ () => { selectWeed(WEED.id); } }
          selected={ selectedWeed === WEED.id } />
      );
    });

    return (
      <Card>
        <CardContent>
          <Typography
            variant="headline">
            Your Inventory and Status
          </Typography>
          <Typography
            variant="subheading">
            Weed You Have
          </Typography>
          <List>
            { weedCards }
          </List>
          <Typography
            variant="subheading">
            Tools You Have
          </Typography>
          <List>
            { toolCards }
          </List>
          <NumberFormat
            displayType={ 'text' }
            renderText={ value => (
              <Chip
                avatar={ <Avatar>{ Math.floor(value) }</Avatar> }
                label="How High You Are" />
            ) }
            value={ highness } />
        </CardContent>
      </Card>
    );
  }
}
import PropTypes          from 'prop-types';
import React              from 'react';
import { Avatar }         from 'react-toolbox/lib/avatar';
import {
  Card,
  CardTitle,
  CardText }              from 'react-toolbox/lib/card';
import { Chip }           from 'react-toolbox/lib/chip';
import {
  List,
  ListItem,
  ListSubHeader }         from 'react-toolbox/lib/list';
import { Switch }         from 'react-toolbox/lib/switch';
import Tooltip            from 'react-toolbox/lib/tooltip';

import { HIGHNESS_CAP }   from '../utils/constants';
import { getUomByName }   from '../utils/miscUtils';
import {
  fixedTo1orRounded,
  moneyFilter,
  parseQuantity }         from '../utils/numberUtils';
import { getToolById }    from '../utils/toolUtils';
import { getStrainById }  from '../utils/weedUtils';

import styles             from './player.css';
import componentStyles    from '../components/components.css';

const TooltipChip = Tooltip(Chip);

let lastUpdate = new Date();

class PlayerComponent extends React.Component {
  static propTypes = {
    gameIsRunning: PropTypes.bool,
    highness: PropTypes.number,
    money: PropTypes.number,
    settingsUoM: PropTypes.string,
    tools: PropTypes.array,
    weed: PropTypes.array,

    decayHighness: PropTypes.func,
    onChangeSettingsUoM: PropTypes.func,
    selectTool: PropTypes.func,
    selectWeed: PropTypes.func
  };

  static contextTypes = {
    loop: PropTypes.object
  };

  componentDidMount() {
    this.context.loop.subscribe(this.loopStatusUpdate);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopStatusUpdate);
  }

  loopStatusUpdate = () => {
    const now = new Date();
    const timeDelta = now - lastUpdate;

    if (this.props.gameIsRunning) {
      this.props.decayHighness(timeDelta);
    }

    lastUpdate = new Date();
  };

  toggleUoM = () => {
    const { settingsUoM } = this.props;

    if (settingsUoM === 'oz') {
      this.props.onChangeSettingsUoM('g');
    } else {
      this.props.onChangeSettingsUoM('oz');
    }
  };

  renderHighness = () => {
    const avatarTitle = this.props.highness >= 9.5 ?
      '!' :
      Math.round(Math.min(this.props.highness, HIGHNESS_CAP)).toString();

    return (
      <TooltipChip
        tooltip={fixedTo1orRounded(Math.min(this.props.highness, HIGHNESS_CAP))} >
        <Avatar
          title={avatarTitle} />
        How High You Are
      </TooltipChip>
    );
  };

  renderMoney = () => (
    <Chip>
      <Avatar
        title='$' />
      {moneyFilter(this.props.money)}
    </Chip>
  );

  renderTools() {
    const tools = this.props.tools.map((tool, idx) => {
      const fullTool = getToolById(tool.id);

      return (
        <ListItem
          key={idx}
          theme={componentStyles}
          caption={fullTool.label}
          legend={fullTool.description}
          className={`${componentStyles.listItem} ${tool.selected ? componentStyles.selectedItem : null}`}
          onClick={() => { this.props.selectTool(idx) }} />
      );
    });

    return (
      <List
        selectable={true}>
        <ListSubHeader caption='Tools You have' />
        {tools}
      </List>
    );
  }

  renderWeed() {
    const fullSettingsUoM = getUomByName(this.props.settingsUoM);
    const weeds = this.props.weed
      .filter((strain) => strain.quantity || strain.seeds)
      .map((weed, idx) => {
        const weedByStrain = getStrainById(weed.id);
        const fullWeed = {
          ...weed,
          ...weedByStrain
        };

        return (
          <ListItem
            key={fullWeed.id}
            theme={componentStyles}
            caption={fullWeed.label}
            legend={fullWeed.description}
            className={`${componentStyles.listItem} ${weed.selected ? componentStyles.selectedItem : null}`}
            rightActions={[
              <Chip
                key='quantity'
                className={styles.weedChip}>
                {`${parseQuantity(weed, fullSettingsUoM)} ${this.props.settingsUoM}`}
              </Chip>,
              <Chip
                key='seeds'
                className={styles.weedChip}>
                {`${fullWeed.seeds} seed${fullWeed.seeds !== 1 ? 's' : ''}`}
              </Chip>
            ]}
            onClick={() => { this.props.selectWeed(fullWeed.id) }} />
        );
      });

    return (
      <List
        selectable={true}>
        <ListSubHeader caption='Weed You Have' />
        {weeds}
      </List>
    );
  }

  render() {
    return (
      <Card>
        <CardTitle
          title='Your Inventory and Status' />
        <CardText>
          <Switch
            checked={this.props.settingsUoM === 'oz'}
            label={'Off for grams, on for ounces'}
            onChange={this.toggleUoM} />
          {this.renderWeed()}
          {this.renderTools()}
          {this.renderHighness()}
        </CardText>
      </Card>
    );
  }
}

export default PlayerComponent;

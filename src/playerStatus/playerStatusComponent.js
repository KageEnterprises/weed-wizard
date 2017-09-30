import React from 'react';
import PropTypes from 'prop-types';
import ItemList from '../components/item-list';
import ItemListItem from '../components/item-list-item';
import { getStrainById } from '../utils/weed-utils';
import {
  parseQuantity,
  fixedTo1orRounded
} from '../utils/number-utils';
import { getToolById } from '../utils/tool-utils';
import { getUomByName } from '../utils/misc-utils';
import {
  CONVERSIONS,
  HIGHNESS_CAP,
  WEED_UOMS
} from '../utils/constants';

import styles from './playerStatus.css';

class PlayerStatusComponent extends React.Component {
  static propTypes = {
    weed: PropTypes.array,
    tools: PropTypes.array,
    highness: PropTypes.number,
    settingsUoM: PropTypes.string,

    selectWeed: PropTypes.func,
    selectTool: PropTypes.func,
    onChangeSettingsUoM: PropTypes.func,
    weedRanOutNotification: PropTypes.func,
    decayHighness: PropTypes.func
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
    this.props.decayHighness();
  };

  componentWillReceiveProps(newProps) {
    if (newProps.weed.length < this.props.weed.length) {
      const weedRanOut = this.props.weed.filter((weed) => {
        return newProps.weed.map(newWeed => newWeed.id).indexOf(weed.id) === -1;
      })[0];
      if (weedRanOut.selected && newProps.weed.length) {
        this.props.selectWeed(0);
      }
      this.props.weedRanOutNotification(weedRanOut.label);
    }
  }

  renderWeed() {
    const fullSettingsUoM = getUomByName(this.props.settingsUoM);
    const weeds = this.props.weed.map((weed, idx) => {
      const weedByStrain = getStrainById(weed.id);
      const fullWeed = {
        ...weed,
        ...weedByStrain
      };
      const convertedQuantity = fullWeed.uom === fullSettingsUoM.name
        ? fullWeed.quantity
        : fullWeed.quantity * CONVERSIONS[`${fullWeed.uom.toUpperCase()}_TO_${fullSettingsUoM.name.toUpperCase()}`];

      return (
        <ItemListItem
          key={idx}
          label={fullWeed.label}
          description={fullWeed.description}
          selected={weed.selected}
          onClick={() => { this.props.selectWeed(idx) }}>
          <span>
            Amount:
            {` ${parseQuantity(weed, fullSettingsUoM.name)} `}
            {`${fullSettingsUoM.label}${
              convertedQuantity > 1
                ? 's'
                : ''
              }`
            }
            </span>
        </ItemListItem>
      );
    });
    const weedUomSelectors = WEED_UOMS.map((uom) => (
      <span
        key={uom.name}
        className={fullSettingsUoM.name === uom.name ? styles.weedUomLabelSelected : styles.weedUomLabel}
        onClick={() => { this.props.onChangeSettingsUoM(uom.name)}}>
        {uom.label}s
      </span>
    ));

    return (
      <ItemList
        header={`Weed You Have`}
        list={weeds}
        before={(
          <p>
            {`Show weed in `}
            {weedUomSelectors}
          </p>
        )} />
    );
  }

  renderTools() {
    const tools = this.props.tools.map((tool, idx) => {
      const fullTool = getToolById(tool.id);

      return (
        <ItemListItem
          key={idx}
          label={fullTool.label}
          description={fullTool.description}
          selected={tool.selected}
          onClick={() => { this.props.selectTool(idx) }} />
      );
    });

    return (
      <ItemList
        header={`Tools You Have`}
        list={tools} />
    );
  }

  renderHighness = () => (
    <p>How High You Are: {fixedTo1orRounded(Math.min(this.props.highness, HIGHNESS_CAP))}</p>
  );

  render() {
    return (
      <div className={styles.playerStatus}>
        {this.renderWeed()}
        {this.renderTools()}
        {this.renderHighness()}
      </div>
    );
  }
}

export default PlayerStatusComponent;

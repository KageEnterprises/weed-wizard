import React from 'react';
import PropTypes from 'prop-types';
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
    weedRanOutNotification: PropTypes.func
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
        <div
          key={idx}
          className={weed.selected ? styles.itemListItemSelected : styles.itemListItem}
          onClick={() => { this.props.selectWeed(idx) }}>
          <p>
            <b>{fullWeed.label}:</b>
            <i>{fullWeed.description}</i>
          </p>
          <p>
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
          </p>
        </div>
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
      <div className={styles.itemList}>
        <h3 className={styles.itemListHeader}>Weed You Have</h3>
        <p className={styles.itemListToggle}>{`Show weed in `}
          {weedUomSelectors}
        </p>
        {weeds}
      </div>
    );
  }

  renderTools() {
    const tools = this.props.tools.map((tool, idx) => {
      const fullTool = getToolById(tool.id);

      return (
        <div
          key={idx}
          className={tool.selected ? styles.itemListItemSelected : styles.itemListItem}
          onClick={() => { this.props.selectTool(idx) }}>
          <p>
            <b>{fullTool.label}:</b>
            <i>{fullTool.description}</i>
          </p>
        </div>
      );
    });

    return (
      <div className={styles.itemList}>
        <h3 className={styles.itemListHeader}>Tools You Have</h3>
        {tools}
      </div>
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

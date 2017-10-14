import React from 'react';
import PropTypes from 'prop-types';
import ItemList from '../components/itemList';
import ItemListItem from '../components/itemListItem';
import { getStrainById } from '../utils/weedUtils';
import {
  parseQuantity,
  fixedTo1orRounded
} from '../utils/numberUtils';
import { getToolById } from '../utils/toolUtils';
import { getUomByName } from '../utils/miscUtils';
import {
  HIGHNESS_CAP,
  WEED_UOMS
} from '../utils/constants';

import styles from './player.css';

class PlayerComponent extends React.Component {
  static propTypes = {
    weed: PropTypes.array,
    tools: PropTypes.array,
    highness: PropTypes.number,
    settingsUoM: PropTypes.string,

    selectWeed: PropTypes.func,
    selectTool: PropTypes.func,
    onChangeSettingsUoM: PropTypes.func,
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
          <ItemListItem
            key={fullWeed.id}
            label={fullWeed.label}
            description={fullWeed.description}
            selected={weed.selected}
            onClick={() => { this.props.selectWeed(idx) }}>
            <div className={styles.weedListItemContent}>
              <p className={styles.weedListItemContentItem}>
                <b>Amount:</b> {parseQuantity(weed, fullSettingsUoM)}
              </p>
              {fullWeed.seeds
                ? <p className={styles.weedListItemContentItem}><b>Seeds</b>: {fullWeed.seeds}</p>
                : null}
            </div>
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
      <div className={styles.player}>
        {this.renderWeed()}
        {this.renderTools()}
        {this.renderHighness()}
      </div>
    );
  }
}

export default PlayerComponent;

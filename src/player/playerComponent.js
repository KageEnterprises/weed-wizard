import PropTypes from 'prop-types';
import React from 'react';

import ItemList           from '../components/itemList';
import ItemListItem       from '../components/itemListItem';
import {
  HIGHNESS_CAP,
  WEED_UOMS }             from '../utils/constants';
import { getUomByName }   from '../utils/miscUtils';
import {
  fixedTo1orRounded,
  parseQuantity }         from '../utils/numberUtils';
import { getToolById }    from '../utils/toolUtils';
import { getStrainById }  from '../utils/weedUtils';

import styles             from './player.css';

let lastUpdate = new Date();

class PlayerComponent extends React.Component {
  static propTypes = {
    gameIsRunning: PropTypes.bool,
    highness: PropTypes.number,
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

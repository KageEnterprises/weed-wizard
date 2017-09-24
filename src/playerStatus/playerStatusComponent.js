import React from 'react';
import PropTypes from 'prop-types';
import { getStrainById } from '../utils/weed-utils';
import {
  parseQuantity,
  fixedTo1orRounded
} from '../utils/number-utils';
import { getToolById } from '../utils/tool-utils';
import {
  HIGHNESS_CAP
} from '../utils/constants';

import './playerStatus.css';

class PlayerStatusComponent extends React.Component {
  static propTypes = {
    weed: PropTypes.array,
    tools: PropTypes.array,
    highness: PropTypes.number,

    selectWeed: PropTypes.func,
    selectTool: PropTypes.func,
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
    const weeds = this.props.weed.map((weed, idx) => {
      const fullWeed = getStrainById(weed.id);

      return (
        <div
          key={idx}
          className={`playerStatus__itemList__item ${weed.selected ? 'playerStatus__itemList__item--selected' : ''}`}
          onClick={() => { this.props.selectWeed(idx) }}>
          <p>
            <b>{fullWeed.label}:</b>
            <i>{fullWeed.description}</i>
          </p>
          <p>
            <span>Amount:
              {` ${parseQuantity(weed.quantity)} `}
              ounce{weed.quantity > 1 ? 's' : ''}</span>
          </p>
        </div>
      );
    });

    return (
      <div className="playerStatus__itemList">
        <h3 className="playerStatus__itemList__header">Weed You Have</h3>
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
          className={`playerStatus__itemList__item ${tool.selected ? 'playerStatus__itemList__item--selected' : ''}`}
          onClick={() => { this.props.selectTool(idx) }}>
          <p>
            <b>{fullTool.label}:</b>
            <i>{fullTool.description}</i>
          </p>
        </div>
      );
    });

    return (
      <div className="playerStatus__itemList">
        <h3 className="playerStatus__itemList__header">Tools You Have</h3>
        {tools}
      </div>
    );
  }

  renderHighness = () => (
    <p>How High You Are: {fixedTo1orRounded(Math.min(this.props.highness, HIGHNESS_CAP))}</p>
  );

  render() {
    return (
      <div className="playerStatus">
        {this.renderWeed()}
        {this.renderTools()}
        {this.renderHighness()}
      </div>
    );
  }
}

export default PlayerStatusComponent;
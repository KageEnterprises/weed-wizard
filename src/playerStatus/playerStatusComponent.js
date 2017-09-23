import React from 'react';
import PropTypes from 'prop-types';
import { getStrainById } from '../utils/weed-utils';
import { getToolById } from '../utils/tool-utils';
import './playerStatus.css';

class PlayerStatusComponent extends React.Component {
  static propTypes = {
    weed: PropTypes.array,
    tools: PropTypes.array,
    highness: PropTypes.number,
    weedRanOutNotification: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.renderWeed = this.renderWeed.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.weed.length < this.props.weed.length) {
      const weedRanOut = this.props.weed.filter((weed) => {
        return newProps.weed.map(newWeed => newWeed.id).indexOf(weed.id) === -1;
      })[0];
      this.props.weedRanOutNotification(weedRanOut.label);
    }
  }

  renderWeed() {
    const weeds = this.props.weed.map((weed, idx) => {
      const fullWeed = getStrainById(weed.id);
      return (
        <div key={idx}>
          <p>
            <b>{fullWeed.label}:</b>
            <i>{fullWeed.description}</i>
          </p>
          <p>
            <span>Amount: {weed.quantity} ozs.</span>
          </p>
        </div>
      );
    });
    return (
      <div>
        <h3>Weed You Have</h3>
        {weeds}
      </div>
    );
  }

  renderTools() {
    const tools = this.props.tools.map((tool, idx) => {
      const fullTool = getToolById(tool.id);
      return (
        <div key={idx}>
          <p>
            <b>{fullTool.label}:</b>
            <i>{fullTool.description}</i>
          </p>
        </div>
      );
    });
    return (
      <div>
        <h3>Tools You Have</h3>
        {tools}
      </div>
    );
  }

  renderHighness() {
    return <p>How High You Are: {this.props.highness}</p>;
  }

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
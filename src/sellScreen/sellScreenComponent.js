import PropTypes            from 'prop-types';
import React                from 'react';
import {
  Row,
  Col }                     from 'react-flexbox-grid';
import {
  Tab,
  Tabs }                    from 'react-toolbox';
import {
  List,
  ListItem }                from 'react-toolbox/lib/list';
import Slider               from 'react-toolbox/lib/slider';

import { CONVERSIONS }      from '../utils/constants';
import { convertQuantity }  from '../utils/numberUtils';
import { getToolById }      from '../utils/toolUtils';
import { getStrainById }    from '../utils/weedUtils';

import componentStyles      from '../components/components.css';
import styles               from './sellScreen.css';

class SellScreenComponent extends React.Component {
  static propTypes = {
    forSale: PropTypes.shape({
      seeds: PropTypes.array,
      tools: PropTypes.array,
      weed: PropTypes.array
    }),
    inventory: PropTypes.shape({
      tools: PropTypes.array,
      weed: PropTypes.array
    }),
    money: PropTypes.number,
    settingsUoM: PropTypes.string,

    seedsForSale: PropTypes.func,
    toolsForSale: PropTypes.func,
    weedForSale: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      sellTabsView: 0 // 0 for weed, 1 for tools
    };

    this.handleTabViewChange = this.handleTabViewChange.bind(this);
  }

  handleSeedsSliderChange(weed, value) {
    this.props.seedsForSale(weed, value);
  }

  handleTabViewChange(index) {
    this.setState({ sellTabsView: index });
  }

  handleToolSliderChange(tool, value) {
    this.props.toolsForSale(tool, value);
  }

  handleWeedSliderChange(weed, value) {
    this.props.weedForSale(weed, value);
  }

  renderForSale() {
    const {
      forSale,
      settingsUoM } = this.props;
    const weedList = forSale.weed
      .filter(weed => weed.quantity > 0)
      .map(weed => (
        <ListItem
          key={weed.id}
          caption={`${weed.quantity.toFixed(2)} ${settingsUoM} of ${weed.label}`} />
      ));
    const seedsList = forSale.seeds
      .filter(weed => weed.quantity > 0)
      .map(weed => (
        <ListItem
          key={weed.id}
          caption={`${weed.quantity} seed${weed.quantity > 1 ? 's' : ''} of ${weed.label}`} />
      ));
    const toolsList = forSale.tools
      .filter(tool => tool.quantity > 0)
      .map(tool => (
        <ListItem
          key={tool.id}
          caption={`${tool.quantity} of ${tool.label}`} />
      ));

    return (
      <List>
        {weedList}
        {seedsList}
        {toolsList}
      </List>
    );
  }

  renderToolsInventoryList() {
    const style = { ...styles };
    const tools = this.props.inventory.tools
      .map((tool) => {
        const toolListing = getToolById(tool.id);
        const forSale = this.props.forSale.tools.find(forSaleTool => forSaleTool.id === tool.id);

        return (
          <ListItem
            key={tool.id}
            theme={style}
            caption={toolListing.label}
            rightActions={[
              <div
                className={styles.sliderContainer}
                key='quantity'>
                <p>Amount</p>
                <Slider
                  editable
                  min={0}
                  max={tool.quantity}
                  value={forSale ? forSale.quantity : 0}
                  step={1}
                  snaps
                  onChange={this.handleToolSliderChange.bind(this, {
                    ...tool,
                    ...toolListing
                  })}
                />
              </div>
            ]} />
        );
      });

    return (
      <List>
        {tools}
      </List>
    );
  }

  renderWeedInventoryList() {
    const weedTheme = {
      ...componentStyles,
      ...styles
    };
    const weeds = this.props.inventory.weed
      .filter((strain) => strain.quantity || strain.seeds)
      .map((weed) => {
        const weedByStrain = getStrainById(weed.id);
        const fullWeed = {
          ...weed,
          ...weedByStrain
        };
        const forSaleWeed = this.props.forSale.weed.find(strain => strain.id === weed.id);
        const forSaleSeeds = this.props.forSale.seeds.find(strain => strain.id === weed.id);
        const maxValue = convertQuantity(fullWeed.quantity, fullWeed.uom, this.props.settingsUoM);
        const actions = [];

        if (fullWeed.quantity > 0) {
          actions.push((
            <div
              className={styles.sliderContainer}
              key='quantity'>
              <p>Amount</p>
              <Slider
                editable
                min={0}
                max={maxValue}
                value={forSaleWeed ? forSaleWeed.quantity : 0}
                onChange={this.handleWeedSliderChange.bind(this, weed)} />
            </div>
          ));
        }

        if (fullWeed.seeds > 0) {
          actions.push((
            <div
              className={styles.sliderContainer}
              key='seeds'>
              <p>Seeds</p>
              <Slider
                editable
                min={0}
                max={fullWeed.seeds}
                value={forSaleSeeds ? forSaleSeeds.quantity : 0}
                step={1}
                snaps
                onChange={this.handleSeedsSliderChange.bind(this, weed)} />
            </div>
          ));
        }

        return (
          <ListItem
            key={fullWeed.id}
            theme={weedTheme}
            caption={`${fullWeed.label} - ${maxValue} ${this.props.settingsUoM}, ${fullWeed.seeds} seeds`}
            rightActions={actions} />
        );
      });

    return (
      <List
        theme={weedTheme}>
        {weeds}
      </List>
    );
  }

  render() {
    return (
      <div>
        <Row>
          <Col
            className={styles.sellColumn}
            xs={6}>
            <h5>Your Inventory</h5>
            <Tabs
              hideMode='display'
              index={this.state.sellTabsView}
              theme={styles}
              onChange={this.handleTabViewChange}>
              <Tab
                theme={styles}
                label='Weed'>
                {this.renderWeedInventoryList()}
              </Tab>
              <Tab label='Tools'>
                {this.renderToolsInventoryList()}
              </Tab>
            </Tabs>
          </Col>
          <Col
            className={styles.sellColumn}
            xs={6}>
            <h5>For Sale</h5>
            {this.renderForSale()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default SellScreenComponent;

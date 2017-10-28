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

import { convertQuantity }  from '../utils/numberUtils';
import { getStrainById }    from '../utils/weedUtils';

import componentStyles      from '../components/components.css';
import styles               from './sellScreen.css';

class SellScreenComponent extends React.Component {
  // In the context of this component, props (mostly) represents the player's inventory ...
  static propTypes = {
    money: PropTypes.number,
    settingsUoM: PropTypes.string,
    tools: PropTypes.array,
    weed: PropTypes.array
  };

  constructor(props) {
    super(props);

    // ... and state (mostly) represents what they've currently got lined up to sell!
    this.state = {
      seeds: props.weed.map(strain => {
        return {
          id: strain.id,
          description: strain.description,
          label: strain.label,
          quantity: 0
        };
      }),
      tools: [],
      sellTabsView: 0, // 0 for weed, 1 for tools
      weed: props.weed.map(strain => {
        return {
          ...strain,
          quantity: 0,
          uom: this.props.settingsUoM
        };
      })
    };

    this.handleTabViewChange = this.handleTabViewChange.bind(this);
  }

  handleSeedsSliderChange(weed, value) {
    const newSeedsState = this.state.seeds.map(strain => {
      return {
        ...strain,
        quantity: strain.id === weed.id ? value : strain.quantity
      };
    });

    this.setState({
      seeds: newSeedsState
    });
  }

  handleTabViewChange(index) {
    this.setState({ sellTabsView: index });
  }

  handleWeedSliderChange(weed, value) {
    const newWeedState = this.state.weed.map(strain => {
      return {
        ...strain,
        quantity: strain.id === weed.id ? value : strain.quantity
      };
    });

    this.setState({
      weed: newWeedState
    })
  }

  renderForSale() {
    const weedList = this.state.weed
      .filter(weed => weed.quantity > 0)
      .map(weed => {
        return (
          <ListItem
            key={weed.id}
            caption={`${weed.quantity} ${this.props.settingsUoM} of ${weed.label}`} />
        );
      });
    const seedsList = this.state.seeds
      .filter(weed => weed.quantity > 0)
      .map(weed => {
        return (
          <ListItem
            key={weed.id}
            caption={`${weed.quantity} seeds of ${weed.label}`} />
        );
      });

    return (
      <List>
        {weedList}
        {seedsList}
      </List>
    );
  }

  renderWeedInventoryList() {
    const weedTheme = {
      ...componentStyles,
      ...styles
    };
    const weeds = this.props.weed
      .filter((strain) => strain.quantity || strain.seeds)
      .map((weed) => {
        const weedByStrain = getStrainById(weed.id);
        const fullWeed = {
          ...weed,
          ...weedByStrain
        };
        const stateWeed = this.state.weed.filter(strain => strain.id === weed.id)[0];
        const stateSeeds = this.state.seeds.filter(strain => strain.id === weed.id)[0];
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
                value={stateWeed.quantity}
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
                value={stateSeeds.quantity}
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
            caption={fullWeed.label}
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
          <Col xs={6}>
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
                Tools
              </Tab>
            </Tabs>
          </Col>
          <Col xs={6}>
            <h5>For Sale</h5>
            {this.renderForSale()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default SellScreenComponent;

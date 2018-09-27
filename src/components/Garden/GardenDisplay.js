import PropTypes from 'prop-types';
import React from 'react';

import {
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';

import {
  contextPropTypes
} from '../../AppContext';

import GardenPlot from './GardenPlot';

export default class GardenDisplay extends React.Component {
  static propTypes = {
    agePlants: PropTypes.func,
    garden: contextPropTypes.player.garden,
    harvestPlant: PropTypes.func,
    loop: contextPropTypes.loopShape,
    removePlant: PropTypes.func
  };

  componentDidMount() {
    const {
      agePlants,
      loop } = this.props;

    this.callbackID = loop.subscribe(() => {
      agePlants();
    });
  }

  componentWillUnmount() {
    this.props.loop.unsubscribe(this.callbackID);
  }

  render() {
    const {
      garden,
      harvestPlant,
      removePlant } = this.props;

    return (
      <Card>
        <CardContent>
          <Typography
            gutterBottom
            variant="headline">
            Garden
          </Typography>
          <Grid container>
            { garden.map((plant, index) => (
              <GardenPlot
                key={ index }
                harvestPlant={ () => { harvestPlant(index) } }
                plant={ plant }
                removePlant={ () => { removePlant(index) } } />
            )) }
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
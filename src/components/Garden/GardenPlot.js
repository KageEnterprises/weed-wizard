import PropTypes from 'prop-types';
import React from 'react';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { theme } from '../../Theme';
import { PLANT_GROWTH_PHASES } from '../../Weed/WeedList';

const primaryColor = theme.palette.primary;

const styles = {
  'card__root--selected': {
    backgroundColor: primaryColor[100],
    boxShadow: `0px 3px 4px 0px ${primaryColor[600]}, 0px 1px 1px 0px ${primaryColor[600]}, 0px 2px 1px -1px ${primaryColor[600]}`
  },
  cardAction__root: {
    padding: '4px',
    '&:last-child': {
      paddingBottom: '4px'
    }
  },
  cardContent__root: {
    padding: '4px 8px',
    '&:last-child': {
      paddingBottom: '4px'
    }
  },
  cardActionButton__root: {
    fontSize: '10px',
    minHeight: '22px',
    minWidth: '0',
    padding: '4px'
  },
  typography__body2: {
    lineHeight: '18px'
  }
};

class GardenPlot extends React.Component {
  static propTypes = {
    plant: PropTypes.shape({})
  };

  readyToHarvest = plant => {
    if (!plant) return false;

    const { phase } = plant;

    return phase === PLANT_GROWTH_PHASES.length - 2;
  };

  render() {
    const {
      classes,
      plant,
      harvestPlant,
      removePlant } = this.props;

    const readyToHarvest = this.readyToHarvest(plant);

    return (
      <Grid item
        xs={ 4 }>
        <Card
          classes={ {
            root: readyToHarvest ? classes['card__root--selected'] : null
          } }>
          <CardContent
            classes={ {
              root: classes.cardContent__root
            } }>
            { !plant && (
              <Typography variant='caption'>
                Just dirt!
              </Typography>
            ) }
            { plant && (
              <div>
                <Typography
                  classes={ { body2: classes.typography__body2 } }
                  variant='body2'>
                  { plant.name }
                </Typography>
                <Typography variant='caption'>
                  { PLANT_GROWTH_PHASES[plant.phase] }
                </Typography>
                <CircularProgress
                  variant='determinate'
                  value={ plant.growthProgress } />
              </div>
            ) }
          </CardContent>
          { plant && (
            <CardActions
              classes={ {
                root: classes.cardAction__root
              } }>
              <Button
                classes={ {
                  root: classes.cardActionButton__root
                } }
                onClick={ removePlant }
                size='small'>
                Remove
              </Button>
              {readyToHarvest && (
                <Button
                  classes={ {
                    root: classes.cardActionButton__root
                  } }
                  onClick={ harvestPlant }
                  size='small'>
                  Harvest
                </Button>
              )}
            </CardActions>
          ) }
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(GardenPlot);
import PropTypes from 'prop-types';
import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';

import AppContext from '../AppContext';

import { getStrainById } from '../Weed/WeedUtils';

class TransmuteDialog extends React.Component {
  static propTypes = {
    actuallyTransmute: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    startGame: PropTypes.func.isRequired
  };

  handleCancel = () => {
    this.props.startGame();
    this.props.closeDialog();
  };

  handleTransmute = id => {
    this.props.actuallyTransmute(id);
  };

  render() {
    const {
      open,
      weedList
    } = this.props;

    const weedListMapping = weedList.map(WEED => {
      return (
        <ListItem
          key={WEED.id}
          button
          onClick={ () => { this.handleTransmute(WEED.id) } }>
          <ListItemText primary={ getStrainById(WEED.id).name } />
        </ListItem>
      );
    });

    return (
      <Dialog open={ open }>
        <DialogTitle>Which weed would you like to transmute?</DialogTitle>
        <DialogContent>
          <List>
            {weedListMapping}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={ this.handleCancel }>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

class TransmuteDialogWrapper extends React.Component {
  render() {
    return (
      <AppContext.Consumer>
        { context => (
          <TransmuteDialog
            actuallyTransmute={ this.props.actuallyTransmute }
            closeDialog={ this.props.closeDialog }
            open={ this.props.open }
            startGame={ context.actions.startGame }
            weedList={ context.player.weedList } />
        ) }
      </AppContext.Consumer>
    );
  }
}

export default TransmuteDialogWrapper;
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import {
  AppBar,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@material-ui/core';
import {
  ChevronLeft as ChevronLeftIcon,
  DeleteForever,
  Menu as MenuIcon,
  PauseCircleFilled,
  Save as SaveIcon
} from '@material-ui/icons';
import {
  MuiThemeProvider,
  withStyles
} from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Theme from './Theme';

import Garden from './components/Garden/GardenContainer';
import InventoryAndStatus from './components/InventoryAndStatus/InventoryAndStatusContainer';
import Magic from './components/Magic/MagicContainer';
import Notifications from './components/Notifications/NotificationsContainer';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create([ 'width', 'margin' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create([ 'width', 'margin' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [ theme.breakpoints.up('sm') ]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto'
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  listItemIconFA: {
    width: '24px !important'
  }
});

class AppDisplay extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      pauseDialogOpen: false,
      resetDialogOpen: false,
      sideDrawerOpen: false,
      welcomeDialogOpen: true
    };
  }

  componentDidMount() {
    const { context } = this.props;
    const {
      actions,
      loop } = context;
    const {
      autosaveTimer,
      updateTimestamp } = actions;

    this.callbackId = loop.subscribe(() => {
      updateTimestamp.call();
      autosaveTimer.call();
    });
  }

  componentWillUnmount() {
    this.props.context.loop.unsubscribe(this.callbackId);
  }

  cancelReset = () => {
    this.props.context.actions.startGame();

    this.setState({ resetDialogOpen: false });
  };

  handleDrawerOpen = () => {
    this.setState({ sideDrawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ sideDrawerOpen: false });
  };

  handlePauseGame = () => {
    this.props.context.actions.stopGame();

    this.setState({
      pauseDialogOpen: true
    });
  };

  handleReset = () => {
    const { context } = this.props;
    const { actions } = context;
    const { resetGame } = actions;

    this.setState({ resetDialogOpen: false }, () => {
      resetGame();
    });
  };

  handleUnpauseGame = () => {
    this.props.context.actions.startGame();

    this.setState({
      pauseDialogOpen: false
    });
  };

  handleWelcomeDialogClose = () => {
    const { context } = this.props;
    const { actions } = context;
    const { startGame } = actions;

    startGame();
    this.setState({ welcomeDialogOpen: false });
  };

  plantButtonIsDisabled = () => {
    const { context } = this.props;
    const { player } = context;
    const {
      garden,
      selectedWeed,
      weedList } = player;

    if (typeof selectedWeed !== 'number') return true;

    if (!garden.some(PLOT => typeof PLOT === 'undefined')) return true;

    const weed = weedList.find(WEED => WEED.id === selectedWeed);

    return weed ? weed.seeds <= 0 : true;
  };

  showResetDialog = () => {
    this.props.context.actions.stopGame();

    this.setState({ resetDialogOpen: true });
  };

  smokeButtonIsDisabled = () => {
    const { context } = this.props;
    const { player } = context;
    const {
      selectedTool,
      selectedWeed,
      weedList } = player;

    if (typeof selectedWeed !== 'number') return true;
    if (typeof selectedTool !== 'number') return true;

    const weed = weedList.find(WEED => WEED.id === selectedWeed);

    return weed ? weed.quantity === 0 : true;
  };

  render() {
    const {
      classes,
      context } = this.props;
    const {
      pauseDialogOpen,
      resetDialogOpen,
      sideDrawerOpen,
      welcomeDialogOpen } = this.state;
    const {
      actions,
      gameIsRunning
    } = context;
    const {
      plantSeed,
      saveState,
      smokeWeed } = actions;

    return (
      <MuiThemeProvider theme={ Theme }>
        <CssBaseline />
        <div className={ classes.root }>
          <AppBar
            position="absolute"
            className={ classNames(classes.appBar, sideDrawerOpen && classes.appBarShift) }>
            <Toolbar
              disableGutters={ !sideDrawerOpen }
              className={ classes.toolbar }>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={ this.handleDrawerOpen }
                className={ classNames(
                  classes.menuButton,
                  sideDrawerOpen && classes.menuButtonHidden,
                ) }>
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap className={ classes.title }>
                Weed Wizard
                </Typography>
              {/* <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton> */}
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={ {
              paper: classNames(classes.drawerPaper, !sideDrawerOpen && classes.drawerPaperClose)
            } }
            open={ sideDrawerOpen }>
            <div className={ classes.toolbarIcon }>
              <IconButton onClick={ this.handleDrawerClose }>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem
                button
                disabled={ this.smokeButtonIsDisabled() }
                onClick={ smokeWeed } >
                <ListItemIcon classes={{ root: classes.listItemIconFA }}>
                  <FontAwesomeIcon icon='joint' />
                </ListItemIcon>
                <ListItemText primary='Smoke Weed' />
              </ListItem>
              <ListItem
                button
                disabled={ this.plantButtonIsDisabled() }
                onClick={ plantSeed }>
                <ListItemIcon classes={{ root: classes.listItemIconFA }}>
                  <FontAwesomeIcon icon='cannabis' />
                </ListItemIcon>
                <ListItemText primary='Plant Seed' />
              </ListItem>
              <ListItem
                button
                disabled={ welcomeDialogOpen || !gameIsRunning }
                onClick={ this.handlePauseGame }>
                <ListItemIcon>
                  <PauseCircleFilled />
                </ListItemIcon>
                <ListItemText primary='Pause Game' />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem
                button
                onClick={ saveState } >
                <ListItemIcon classes={{ root: classes.listItemIconFA }}>
                  <SaveIcon />
                </ListItemIcon>
                <ListItemText primary='Save Game' />
              </ListItem>
              <ListItem
                button
                onClick={ this.showResetDialog } >
                <ListItemIcon classes={{ root: classes.listItemIconFA }}>
                  <DeleteForever />
                </ListItemIcon>
                <ListItemText primary='Reset Game' />
              </ListItem>
            </List>
          </Drawer>
          <main className={ classes.content }>
            <div className={ classes.appBarSpacer } />
            <Grid container
              spacing={ 16 }>
              <Grid item
                xs={ 4 }>
                <InventoryAndStatus />
              </Grid>
              <Grid item
                xs={ 4 }>
                <Magic />
              </Grid>
              <Grid item
                xs={ 4 }>
                <Garden />
              </Grid>
            </Grid>
          </main>
        </div>
        <Notifications />
        <Dialog open={ welcomeDialogOpen }>
          <DialogTitle>Welcome to Weed Wizard!</DialogTitle>
          <DialogContent>
            <DialogContentText>Go and smoke some weed!</DialogContentText>
            <Typography variant={'caption'}>
              {`Most weed names in this game are from or inspired by the `}
              <a
                href='https://generatorhell.com/weed-name/'
                rel='noopener noreferrer'
                target='_blank'>Weed Name Generator</a>.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={ this.handleWelcomeDialogClose } color="primary" autoFocus>
              Okay!
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={ pauseDialogOpen }>
          <DialogTitle>Game Paused</DialogTitle>
          <DialogActions>
            <Button onClick={ this.handleUnpauseGame } color="primary" autoFocus>
              Unpause!
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={ resetDialogOpen }>
          <DialogTitle>Are You Sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>Do you really want to reset the game?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ this.cancelReset } color="secondary">
              Cancel!
            </Button>
            <Button onClick={ this.handleReset } color="primary">
              Reset!
            </Button>
          </DialogActions>
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(AppDisplay);
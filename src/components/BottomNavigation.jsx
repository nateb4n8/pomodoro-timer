import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import WorkIcon from '@material-ui/icons/Work';
import SettingsIcon from '@material-ui/icons/Settings';
import ChartIcon from '@material-ui/icons/TableChart';
import { Link } from 'react-router-dom';

class BottomAppBar extends Component {
  state = {
    currentPage: '',
  }

  handleClick = (currentPage) => { this.setState({ currentPage }); }

  render() {
    const { classes } = this.props;
    const { currentPage } = this.state;

    return (
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color={currentPage === '/' ? 'secondary' : 'inherit'}
            aria-label="Open timer"
            onClick={() => this.handleClick('/')}
            component={Link}
            to="/"
          >
            <WorkIcon />
          </IconButton>
          {/* <IconButton
            color={currentPage === '/statistics/' ? 'secondary' : 'inherit'}
            aria-label="Open statistics"
            onClick={() => this.handleClick('/statistics/')}
            component={Link}
            to="/statistics/"
          >
            <ChartIcon />
          </IconButton> */}
          <IconButton
            color={currentPage === '/settings/' ? 'secondary' : 'inherit'}
            aria-label="Open settings"
            onClick={() => this.handleClick('/settings/')}
            component={Link}
            to="/settings/"
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
});

export default withStyles(styles)(BottomAppBar);

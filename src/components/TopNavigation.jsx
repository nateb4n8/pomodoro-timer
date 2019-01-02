import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import { Menu as MenuIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import { appName } from '../utils/config';

class TopNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false,
    };
  }

  toggleDrawer = drawerOpen => this.setState({ drawerOpen });

  renderDrawer = () => {
    const { drawerOpen } = this.state;
    return (
      <Drawer
        open={drawerOpen}
        onClose={this.toggleDrawer('left', false)}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={this.toggleDrawer('left', false)}
          onKeyDown={this.toggleDrawer('left', false)}
        >
          {/* {sideList} */}
        </div>
      </Drawer>
    );
  }

  render() {
    const { toggleDrawer, classes, signedIn } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>

          { !signedIn ? null
            : (
              <IconButton
                color="inherit"
                aria-label="Menu"
                className={classes.menuButton}
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            )
          }

          <Typography
            variant="h6"
            color="inherit"
            component={Link}
            className={classes.title}
            to="/"
          >
            {appName}
          </Typography>

          <div className={classes.grow} />

          <Hidden smDown>
            <Button color="inherit" component={Link} to="/privacy/">Privacy</Button>
            <Button color="inherit" component={Link} to="/terms/">Terms</Button>
            <Button color="inherit" component={Link} to="/about/">About</Button>
          </Hidden>

          {
            signedIn
              ? <Button color="inherit" onClick={() => console.log('need to logout')}>Logout</Button>
              : <Button color="inherit" component={Link} to="/login/">Login</Button>
          }

        </Toolbar>
      </AppBar>
    );
  }
}


TopNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};


const styles = {
  title: {
    textDecoration: 'none',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    // marginRight: 20,
  },
  logo: {
    width: 32,
    height: 'auto',
  },
};


export default withStyles(styles)(TopNavigation);

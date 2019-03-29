import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import TimerForm from './TimerForm';


const styles = theme => ({
  root: {
    paddingBottom: 64,
  },
});


class Settings extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TimerForm />
      </div>
    );
  }
}


export default withStyles(styles)(Settings);

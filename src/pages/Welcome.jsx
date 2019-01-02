import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import { appName } from '../utils/config';


class Welcome extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="column" alignItems="center">

        <Typography variant="h2" color="inherit">{appName}</Typography>

      </Grid>

    );
  }
}


const styles = theme => ({
  logo: {
    width: 256,
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
});


export default withStyles(styles)(Welcome);

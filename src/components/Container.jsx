import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

function Container({ children, classes }) {
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        className={classes.container}
      >
        {children}
      </Grid>
    </div>
  );
}

Container.defaultProps = {
  children: {},
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  classes: PropTypes.object.isRequired,
};

const styles = {
  container: {
    height: '100%',
  },
  root: {
    padding: 8,
    height: '100%',
  },
};


export default withStyles(styles)(Container);

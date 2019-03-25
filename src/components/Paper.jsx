import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '100%',
  },
});

function EnhancedPaper(props) {
  const { classes, children } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      {children}
    </Paper>
  );
}

EnhancedPaper.defaultProps = {
  children: null,
};

EnhancedPaper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object,
};

export default withStyles(styles)(EnhancedPaper);

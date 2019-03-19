import React from 'react';
import PropTypes from 'prop-types';
import WorkIcon from '@material-ui/icons/Work';
import { Grid, withStyles } from '@material-ui/core';


const styles = {
  lapIcon: {
    width: '1.5em',
    height: '1.5em',
  },
};


function CompletedSessions(props) {
  const { classes, sessionAmt, completeAmt } = props;

  const sessions = [];

  for (let i = 0; i < sessionAmt; i += 1) {
    if (i < sessionAmt - completeAmt) {
      sessions.push({ color: 'disabled', id: i });
    }
    else {
      sessions.push({ color: 'primary', id: i });
    }
  }

  return (
    <Grid container>
      { sessions.map(({ color, id }) => (
        <WorkIcon className={classes.lapIcon} color={color} key={id} />))
      }
    </Grid>
  );
}

CompletedSessions.propTypes = {
  classes: PropTypes.object.isRequired,
  sessionAmt: PropTypes.number.isRequired,
  completeAmt: PropTypes.number.isRequired,
};

export default withStyles(styles)(CompletedSessions);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Fab } from '@material-ui/core';

const styles = {
  fab: {
    marginLeft: '1rem',
    marginRight: '1rem',
  },
};

function FloatButton(props) {
  const {
    classes, aria, onClick, children,
  } = props;

  return (
    <Fab
      color="primary"
      aria-label={aria}
      className={classes.fab}
      onClick={onClick}
    >
      {children}
    </Fab>
  );
}

FloatButton.propTypes = {
  classes: PropTypes.object.isRequired,
  aria: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatButton);

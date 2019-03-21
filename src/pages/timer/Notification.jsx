import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import amber from '@material-ui/core/colors/amber';

const styles = theme => ({
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  closeIcon: {
    fontSize: 20,
    opacity: 0.9,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  breakOver: {
    backgroundColor: amber[700],
  },
});

function Notification(props) {
  const {
    classes, open, onClose, onClick, msg, timeout,
  } = props;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      onClose={onClose}
      autoHideDuration={timeout}
    >
      <SnackbarContent
        className={classes.breakOver}
        aria-describedby="notification"
        message={
          (
            <span id="notification" className={classes.message}>
              <InfoIcon className={classes.icon} />
              {msg}
            </span>
          )
        }
        action={(
          <IconButton
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClick}
          >
            <CloseIcon className={classes.closeIcon} />
          </IconButton>
        )}
      />
    </Snackbar>
  );
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  msg: PropTypes.string.isRequired,
  timeout: PropTypes.number.isRequired,
};

export default withStyles(styles)(Notification);

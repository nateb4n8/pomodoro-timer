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
});

function Notification(props) {
  const {
    classes, open, onClose, onClick, msg, timeout, color,
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
        style={{
          backgroundColor: color,
        }}
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

Notification.defaultProps = {
  color: amber[700],
};

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  msg: PropTypes.string.isRequired,
  timeout: PropTypes.number.isRequired,
  color: PropTypes.string,
};

export default withStyles(styles)(Notification);

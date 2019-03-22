import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
    outline: 'none',
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


function Confirmation(props) {
  const {
    classes, open, onClose, onClickYes, onClickNo, msg,
  } = props;

  return (
    <Modal
      aria-describedby="modal-confirmation"
      open={open}
      onClose={onClose}
      className={classes.modal}
    >
      <div className={classes.paper}>
        <Typography id="modal-confirmation" variant="body1">{msg}</Typography>

        <Grid container justify="flex-end">
          <Button onClick={onClickNo}>
            No
          </Button>
          <Button onClick={onClickYes}>
            Yes
          </Button>
        </Grid>
      </div>
    </Modal>
  );
}

Confirmation.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClickNo: PropTypes.func.isRequired,
  onClickYes: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  msg: PropTypes.string.isRequired,
};

export default withStyles(styles)(Confirmation);

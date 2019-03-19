import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, Fab, Modal, Button, SnackbarContent, IconButton,
} from '@material-ui/core/';
import CircularProgress from '@material-ui/core/CircularProgress';
import PlayIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import WorkIcon from '@material-ui/icons/Work';
import PauseIcon from '@material-ui/icons/Pause';
import CoffeeIcon from '@material-ui/icons/FreeBreakfast';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import Snackbar from '@material-ui/core/Snackbar';
import amber from '@material-ui/core/colors/amber';

import CompletedSessions from './CompletedSessions';
import FloatButton from './FloatButton';

import {
  resetSession,
  updateTimer,
  setWorkStarted,
  setPaused,
  workComplete,
  setBreakComplete,
  setBreakStarted,
} from '../../actions/timer';


const IDLE = 'IDLE';
const RUNNING = 'RUNNING';
const PAUSED = 'PAUSED';


const StartButton = ({ onClick }) => (
  <FloatButton aria="Start Work Timer" onClick={onClick}>
    <WorkIcon />
  </FloatButton>
);
StartButton.propTypes = { onClick: PropTypes.func.isRequired };

const PauseButton = ({ onClick }) => (
  <FloatButton aria="Pause Timer" onClick={onClick}>
    <PauseIcon />
  </FloatButton>
);
PauseButton.propTypes = { onClick: PropTypes.func.isRequired };

const StopButton = ({ onClick }) => (
  <FloatButton aria="Stop Timer" onClick={onClick}>
    <StopIcon />
  </FloatButton>
);
StopButton.propTypes = { onClick: PropTypes.func.isRequired };

const BreakButton = ({ onClick }) => (
  <FloatButton aria="Start Break Timer" onClick={onClick}>
    <CoffeeIcon />
  </FloatButton>
);
BreakButton.propTypes = { onClick: PropTypes.func.isRequired };


class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      intervalId: null,
      stopRequest: false,
      breakRequest: false,
      breakSnackbarOpen: false,
    };
  }

  componentDidMount() {
    const { status } = this.props;

    if (status === RUNNING) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    const { intervalId } = this.state;

    clearInterval(intervalId);
  }

  getTimeRemaining = () => {
    const { startTime, duration, timeIntervals } = this.props;

    let timeElapsed = moment.duration(
      moment().diff(
        moment(startTime || new Date()),
      ),
    );
    timeElapsed = Math.round(timeElapsed.as('seconds'));

    timeElapsed += timeIntervals.reduce((a, v) => a + v, 0);

    return duration - timeElapsed;
  }

  timerWrapper = () => {
    const { dispatch, type } = this.props;

    const timeRemaining = this.getTimeRemaining();

    if (timeRemaining <= 0) {
      if (type === 'WORK') {
        const { intervalId } = this.state;
        clearInterval(intervalId);

        this.setState({
          breakRequest: true,
          modalOpen: true,
        });
        dispatch(workComplete());
      }
      else {
        const { intervalId } = this.state;
        clearInterval(intervalId);

        dispatch(setBreakComplete());

        this.setState({
          breakSnackbarOpen: true,
        });
      }
    }
    else dispatch(updateTimer({ timeRemaining }));
  }

  resetTimer = () => {
    // stop timer from updating global state
    const { intervalId } = this.state;
    if (intervalId) clearInterval(intervalId);

    // reset timer to defaults
    const { dispatch } = this.props;
    dispatch(resetSession());

    // close the "are you sure" modal
    this.setState({ modalOpen: false });
  }

  startTimer = () => {
    const { dispatch } = this.props;
    dispatch(setWorkStarted());

    const intervalId = setInterval(this.timerWrapper, 1000);
    this.setState({ intervalId });
  }

  onClickPaused = () => {
    const { intervalId } = this.state;
    clearInterval(intervalId);

    const { dispatch } = this.props;
    dispatch(setPaused());
    // dispatch(setStartTime(null));
    // dispatch(setStatusPaused());
  }

  handleClose = () => {
    // this.resetTimer();

    this.setState({
      modalOpen: false,
      stopRequest: false,
      breakRequest: false,
    });
  }

  closeBreakSnackbar = () => {
    this.setState({
      breakSnackbarOpen: false,
    });
  }

  onClickControl = () => {
    const { status } = this.props;

    if (status === IDLE || status === PAUSED) {
      this.startTimer();
    }
    else if (status === RUNNING) {
      this.pauseTimer();
    }
  }

  onClickReset = () => {
    this.resetTimer();
  }

  onClickStop = () => {
    this.setState({
      modalOpen: true,
      stopRequest: true,
    });
  }

  onClickResume = () => {
    console.log('resuming');
    // TODO
  }


  onClickStartWork = () => {
    const { dispatch } = this.props;
    dispatch(setWorkStarted());

    const intervalId = setInterval(this.timerWrapper, 1000);
    this.setState({ intervalId });
  }

  onClickStartBreak = () => {
    const { dispatch } = this.props;
    dispatch(setBreakStarted());

    const intervalId = setInterval(this.timerWrapper, 1000);
    this.setState({ intervalId });
  }

  renderStop = () => {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="body1">Are you sure you want to stop?</Typography>
        <div>
          <Button
            className={classes.button}
            onClick={this.handleClose}
          >
            Cancel
          </Button>
          <Button
            className={classes.button}
            onClick={this.resetTimer}
          >
            Ok
          </Button>
        </div>
      </div>
    );
  }

  renderBreak = () => {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="body1">Do you want to take a break?</Typography>
        <div>
          <Button
            className={classes.button}
            onClick={() => { this.onClickStartWork(); this.handleClose(); }}
          >
            No
          </Button>
          <Button
            className={classes.button}
            onClick={() => { this.onClickStartBreak(); this.handleClose(); }}
          >
            Yes
          </Button>
        </div>
      </div>
    );
  }

  render() {
    const {
      classes, status, duration, type, sessionAmt, completeAmt,
    } = this.props;
    const {
      modalOpen, breakRequest, stopRequest, breakSnackbarOpen,
    } = this.state;

    const timeRemaining = this.getTimeRemaining();
    const remaining = moment.duration(timeRemaining, 'seconds');

    const minutes = remaining.minutes();
    const seconds = remaining.seconds();
    const timer = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    const progress = (timeRemaining / duration) * 100;

    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={16}
        className={classes.container}
      >

        <Grid item>
          <CompletedSessions
            sessionAmt={sessionAmt}
            completeAmt={completeAmt}
          />
        </Grid>

        <Grid item>
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress
                value={progress}
                size={200}
                thickness={2}
                variant="static"
              />
            </Grid>
            <Grid item style={{ position: 'absolute' }}>
              <Typography
                variant="h4"
                color="inherit"
                headlineMapping={{ h4: 'p' }}
              >
                {timer}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container justify="center" alignItems="center">
            <Grid item>
              { status === IDLE || status === PAUSED
                ? <StartButton onClick={this.onClickStartWork} />
                : <PauseButton onClick={this.onClickPaused} />
              }
            </Grid>
            <Grid item>
              { status === RUNNING || status === PAUSED
                ? <StopButton onClick={this.onClickStop} />
                : <BreakButton onClick={this.onClickStartBreak} />
              }
            </Grid>
          </Grid>
        </Grid>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={modalOpen}
          onClose={this.handleClose}
          className={classes.modal}
        >
          <div className={classes.paper}>
            <Grid container direction="column" justify="center" alignItems="center">
              { breakRequest ? this.renderBreak() : null }
              { stopRequest ? this.renderStop() : null }
            </Grid>
          </div>
        </Modal>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={breakSnackbarOpen}
          onClose={this.closeBreakSnackbar}
          autoHideDuration={5000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
        >
          <SnackbarContent
            className={classes.breakOver}
            aria-describedby="client-snackbar"
            message={
              (
                <span id="client-snackbar" className={classes.message}>
                  <InfoIcon className={classes.icon} />
                  Break time over!
                </span>
              )
            }
            action={(
              <IconButton
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.closeBreakSnackbar}
              >
                <CloseIcon className={classes.closeIcon} />
              </IconButton>
            )}
          />
        </Snackbar>
      </Grid>
    );
  }
}

Timer.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,

  timeRemaining: PropTypes.number.isRequired,
  startTime: PropTypes.object,
  status: PropTypes.string.isRequired,
  sessionAmt: PropTypes.number.isRequired,
  completeAmt: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

Timer.defaultProps = {
  startTime: null,
};

const styles = theme => ({
  reset: {
    color: theme.palette.getContrastText(theme.palette.warning.main),
    backgroundColor: theme.palette.warning.main,
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  container: {
    height: '100%',
  },
  fab: {
    marginLeft: '1rem',
    marginRight: '1rem',
  },
  lapIcon: {
    width: '1.5em',
    height: '1.5em',
  },
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
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  closeIcon: {
    fontSize: 20,
    opacity: 0.9,
  },
  breakOver: {
    backgroundColor: amber[700],
  },
});

function mapStateToProps({ timer }) {
  return {
    ...timer,
  };
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(Timer);

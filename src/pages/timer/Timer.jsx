import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import StopIcon from '@material-ui/icons/Stop';
import WorkIcon from '@material-ui/icons/Work';
import PauseIcon from '@material-ui/icons/Pause';
import CoffeeIcon from '@material-ui/icons/FreeBreakfast';

import CompletedSessions from './CompletedSessions';
import Fab from './FloatButton';
import Notification from './Notification';
import Confirmation from './Confirmation';

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
  <Fab aria="Start Work Timer" onClick={onClick}><WorkIcon /></Fab>
);
StartButton.propTypes = { onClick: PropTypes.func.isRequired };

const PauseButton = ({ onClick }) => (
  <Fab aria="Pause Timer" onClick={onClick}><PauseIcon /></Fab>
);
PauseButton.propTypes = { onClick: PropTypes.func.isRequired };

const StopButton = ({ onClick }) => (
  <Fab aria="Stop Timer" onClick={onClick}><StopIcon /></Fab>
);
StopButton.propTypes = { onClick: PropTypes.func.isRequired };

const BreakButton = ({ onClick }) => (
  <Fab aria="Start Break Timer" onClick={onClick}><CoffeeIcon /></Fab>
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
  }

  handleClose = () => {
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

  onClickReset = () => {
    this.resetTimer();
  }

  onClickStop = () => {
    this.setState({
      modalOpen: true,
      stopRequest: true,
    });
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

  render() {
    const {
      classes, status, duration, sessionAmt, completeAmt,
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

        { breakRequest
          && (
          <Confirmation
            open={modalOpen}
            onClose={this.handleClose}
            onClickYes={() => { this.onClickStartBreak(); this.handleClose(); }}
            onClickNo={() => { this.onClickStartWork(); this.handleClose(); }}
            msg="Do you want to take a break?"
          />)
        }
        { stopRequest
          && (
          <Confirmation
            open={modalOpen}
            onClose={this.handleClose}
            onClickYes={this.resetTimer}
            onClickNo={this.handleClose}
            msg="Are you sure you want to stop?"
          />)
        }

        <Notification
          open={breakSnackbarOpen}
          onClose={this.closeBreakSnackbar}
          onClick={this.closeBreakSnackbar}
          msg="Break time over!"
          timeout={5000}
        />
      </Grid>
    );
  }
}

Timer.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,

  startTime: PropTypes.object,
  status: PropTypes.string.isRequired,
  sessionAmt: PropTypes.number.isRequired,
  completeAmt: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  timeIntervals: PropTypes.array.isRequired,
};

Timer.defaultProps = {
  startTime: null,
};

const styles = {
  container: {
    height: '100%',
    marginLeft: -16,
    marginRight: -16,
  },
};

function mapStateToProps({ timer }) {
  return {
    ...timer,
  };
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(Timer);

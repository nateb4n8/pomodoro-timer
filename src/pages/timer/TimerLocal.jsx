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

// import {
//   resetSession,
//   updateTimer,
//   setWorkStarted,
//   setPaused,
//   workComplete,
//   setBreakComplete,
//   setBreakStarted,
// } from '../../actions/timer';


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
      sessionsCompleteSnackbarOpen: false,

      duration: props.workDuration,
      sessionsComplete: 0,
      status: IDLE,
      timeRemaining: props.workDuration,
      type: 'WORK',
      timeIntervals: [],
    };
  }

  componentDidMount() {}

  componentWillUnmount() {
    const { intervalId } = this.state;

    clearInterval(intervalId);
  }

  // getTimeRemaining = () => {
  //   const { startTime, duration, timeIntervals } = this.props;

  // let timeElapsed = moment.duration(
  //   moment().diff(
  //     moment(startTime || new Date()),
  //   ),
  // );
  //   timeElapsed = Math.round(timeElapsed.as('seconds'));

  //   timeElapsed += timeIntervals.reduce((a, v) => a + v, 0);

  //   return duration - timeElapsed;
  // }

  timerWrapper = () => {
    const { workDuration, workSessions } = this.props;
    const {
      sessionsComplete, startTime, duration, type, timeIntervals,
    } = this.state;

    let timeElapsed = moment.duration(
      moment().diff(
        moment(startTime || new Date()),
      ),
    );
    timeElapsed = Math.round(timeElapsed.as('seconds'));
    timeElapsed += timeIntervals.reduce((a, v) => a + v, 0);

    const timeRemaining = Math.round(duration - timeElapsed);

    if (timeRemaining <= 0) {
      const { intervalId } = this.state;
      clearInterval(intervalId);

      if (type === 'WORK') {
        const workSessionsDone = sessionsComplete === workSessions - 1;

        this.setState({
          breakRequest: true,
          modalOpen: true,
          sessionsComplete: sessionsComplete + 1,
          status: IDLE,
          timeRemaining: 0,
          timeIntervals: [],
          sessionsCompleteSnackbarOpen: workSessionsDone,
        });
      }
      else {
        this.setState({
          breakSnackbarOpen: true,
          status: IDLE,
          type: 'WORK',
          duration: workDuration,
          timeRemaining: workDuration,
          timeIntervals: [],
        });
      }
    }
    else this.setState({ timeRemaining });
  }

  resetTimer = () => {
    const { workDuration } = this.props;

    // stop timer from updating global state
    const { intervalId } = this.state;
    if (intervalId) clearInterval(intervalId);

    // reset timer to defaults
    // close the "are you sure" modal
    this.setState({
      modalOpen: false,
      breakRequest: false,
      stopRequest: false,
      duration: workDuration,
      sessionsComplete: 0,
      status: IDLE,
      timeRemaining: workDuration,
      type: 'WORK',
      timeIntervals: [],
    });
  }

  startTimer = () => {
    // const { dispatch } = this.props;
    // dispatch(setWorkStarted());

    // const intervalId = setInterval(this.timerWrapper, 1000);
    // this.setState({ intervalId });
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

  closeCompleteSnackbar = () => {
    this.setState({
      sessionsCompleteSnackbarOpen: false,
    });
  }

  onClickReset = () => {
    // this.resetTimer();
  }

  onClickStop = () => {
    this.setState({
      modalOpen: true,
      stopRequest: true,
    });
  }

  onClickStartWork = () => {
    const { workDuration } = this.props;
    const intervalId = setInterval(this.timerWrapper, 1000);
    this.setState({
      startTime: new Date(),
      intervalId,
      status: RUNNING,
      type: 'WORK',
      duration: workDuration,
      timeRemaining: workDuration,
      timeIntervals: [],
    });
  }

  onClickResume = () => {
    const intervalId = setInterval(this.timerWrapper, 1000);
    this.setState({
      startTime: new Date(),
      intervalId,
      status: RUNNING,
    });
  }

  onClickStartBreak = () => {
    const { breakDuration } = this.props;
    const intervalId = setInterval(this.timerWrapper, 1000);
    this.setState({
      startTime: new Date(),
      intervalId,
      status: RUNNING,
      type: 'BREAK',
      duration: breakDuration,
      timeRemaining: breakDuration,
      timeIntervals: [],
    });
  }

  onClickPaused = () => {
    const { intervalId, startTime, timeIntervals } = this.state;
    clearInterval(intervalId);

    const now = moment();
    const prev = moment(startTime);
    const diff = moment.duration(now.diff(prev)).as('seconds');
    const res = Math.round(diff);

    this.setState({
      status: 'PAUSED',
      startTime: null,
      timeIntervals: [...timeIntervals, res],
    });
  }

  render() {
    const { classes } = this.props;
    const { longBreakEnabled, workSessions } = this.props;
    const {
      modalOpen,
      breakRequest,
      stopRequest,
      breakSnackbarOpen,

      duration,
      sessionsComplete,
      status,
      timeRemaining,
      sessionsCompleteSnackbarOpen,
    } = this.state;

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
          { longBreakEnabled && (
            <CompletedSessions
              sessionAmt={workSessions}
              completeAmt={sessionsComplete}
            />)
          }
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

            { status === IDLE && (
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  <StartButton onClick={this.onClickStartWork} />
                </Grid>
                <Grid item>
                  <BreakButton onClick={this.onClickStartBreak} />
                </Grid>
              </Grid>)
            }
            { status === PAUSED && (
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  <StartButton onClick={this.onClickResume} />
                </Grid>
                <Grid item>
                  <StopButton onClick={this.onClickStop} />
                </Grid>
              </Grid>)
            }
            { status === RUNNING && (
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  <PauseButton onClick={this.onClickPaused} />
                </Grid>
                <Grid item>
                  <StopButton onClick={this.onClickStop} />
                </Grid>
              </Grid>)
            }
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

        <Notification
          open={sessionsCompleteSnackbarOpen}
          onClose={this.closeCompleteSnackbar}
          onClick={this.closeCompleteSnackbar}
          msg="Congratulations! All work sessions are complete."
          timeout={10000}
          color="#4caf50"
        />
      </Grid>
    );
  }
}

Timer.propTypes = {
  classes: PropTypes.object.isRequired,
  workDuration: PropTypes.number.isRequired,
  breakDuration: PropTypes.number.isRequired,
  longBreakEnabled: PropTypes.bool.isRequired,
  workSessions: PropTypes.number.isRequired,
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

function mapStateToProps({ settings }) {
  return {
    ...settings,
  };
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(Timer);

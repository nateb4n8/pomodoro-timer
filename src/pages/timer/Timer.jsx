import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, Fab, Modal, Button,
} from '@material-ui/core/';
import CircularProgress from '@material-ui/core/CircularProgress';
import PlayIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import WorkIcon from '@material-ui/icons/Work';
import PauseIcon from '@material-ui/icons/Pause';
import CoffeeIcon from '@material-ui/icons/FreeBreakfast';

import { updateTimer } from '../../actions/timer';

const IDLE = 'IDLE';
const RUNNING = 'RUNNING';
const PAUSED = 'PAUSED';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      intervalId: null,
    };
  }

  componentDidMount() {
    // const { startTime } = this.props;

    // if (startTime !== null) {
    //   const intervalId = setInterval(this.timerWrapper, 500);

    //   this.setState({ intervalId });
    // }
  }

  componentWillUnmount() {
    const { intervalId } = this.state;

    clearInterval(intervalId);
  }

  timerWrapper = () => {
    let { dispatch, startTime, timeRemaining } = this.props;

    if (startTime === null) startTime = new Date();

    const timeElapsed = moment.duration(
      moment().diff(moment(startTime)),
    );

    console.log(`${timeRemaining} / ${timeElapsed.as('seconds')}`);
    timeRemaining -= timeElapsed.as('seconds');

    dispatch(updateTimer({
      startTime: new Date(),
      timeRemaining,
    }));
  }

  resetTimer = () => {
    const { intervalId } = this.state;
    if (intervalId) clearInterval(intervalId);

    this.setState({ modalOpen: false });
  }

  startTimer = () => {
    const intervalId = setInterval(this.timerWrapper, 1000);

    this.setState({ intervalId });
  }

  pauseTimer = () => {
    const { intervalId } = this.state;

    clearInterval(intervalId);

    // this.setState({ status: PAUSED });
  }

  handleClose = () => {
    this.setState({
      modalOpen: false,
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
    });
  }

  renderSessions = () => {
    const { classes, sessionAmt, completeAmt } = this.props;

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

  render() {
    const { classes, status, timeRemaining } = this.props;
    const { modalOpen } = this.state;

    const remaining = moment.duration(timeRemaining, 'seconds');

    const minutes = remaining.minutes();
    const seconds = remaining.seconds();
    const timer = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    const primaryInput = {
      ariaLabel: 'Start Timer',
      icon: <WorkIcon />,
      action: this.startTimer,
    };
    const secondaryInput = {
      ariaLabel: 'Stop Timer',
      icon: <StopIcon />,
      action: this.onClickStop,
    };

    if (status === RUNNING) {
      primaryInput.ariaLabel = 'Pause Timer';
      primaryInput.icon = <PauseIcon />;
    }
    else if (status === PAUSED) {
      primaryInput.ariaLabel = 'Resume Timer';
      primaryInput.icon = <PlayIcon />;
    }
    else {
      secondaryInput.ariaLabel = 'Start Break Timer';
      secondaryInput.icon = <CoffeeIcon />;
    }

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
          { this.renderSessions() }
        </Grid>

        <Grid item>
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress
                value={100}
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
              <Fab
                color="primary"
                aria-label={primaryInput.ariaLabel}
                className={classes.fab}
                onClick={this.onClickControl}
              >
                {primaryInput.icon}
              </Fab>
            </Grid>

            <Grid item>
              <Fab
                color="primary"
                aria-label={secondaryInput.ariaLabel}
                className={classes.fab}
                onClick={secondaryInput.action}
              >
                {secondaryInput.icon}
              </Fab>
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
              <Typography variant="body1" id="modal-title">
                Are you sure you want to stop?
              </Typography>
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
            </Grid>
          </div>
        </Modal>

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

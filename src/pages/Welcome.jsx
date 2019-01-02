import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const NOTSTARTED = 'NOTSTARTED';
const RUNNING = 'RUNNING';
const PAUSED = 'PAUSED';

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeRemaining: 25 * 60,
      status: NOTSTARTED,
    };
  }

  resetTimer = () => {
    const { intervalId } = this.state;
    if (intervalId) clearInterval(intervalId);

    this.setState({
      status: NOTSTARTED,
      timeRemaining: 25 * 60, // 25 minutes in seconds
    });
  }

  startTimer = () => {
    const self = this;
    const intervalId = setInterval(() => {
      const { timeRemaining } = self.state;
      self.setState({
        timeRemaining: timeRemaining - 1,
      });
    }, 1000);

    this.setState({
      intervalId,
    });
  }

  pauseTimer = () => {
    const { intervalId } = this.state;
    clearInterval(intervalId);
  }

  onClickControl = () => {
    const { status } = this.state;
    if (status === NOTSTARTED) {
      this.startTimer();
      this.setState({ status: RUNNING });
    } else if (status === RUNNING) {
      this.pauseTimer();
      this.setState({ status: PAUSED });
    } else if (status === PAUSED) {
      this.startTimer();
      this.setState({ status: RUNNING });
    }
  }

  onClickReset = () => {
    this.resetTimer();
  }

  render() {
    const { classes } = this.props;
    const { timeRemaining, status } = this.state;

    const remaining = timeRemaining;

    let controlText = '';
    if (status === NOTSTARTED) controlText = 'Start';
    else if (status === RUNNING) controlText = 'Pause';
    else if (status === PAUSED) controlText = 'Resume';

    const minutes = parseInt(remaining / 60, 10);
    let seconds = (remaining % 60);
    if (seconds < 10) seconds = `0${seconds}`;
    
    const timer = `${minutes}:${seconds}`;

    return (
      <Grid container direction="column" justify="center" alignItems="center" className={classes.container}>

        <Typography variant="h2" color="inherit">
          {timer}
        </Typography>

        <Grid container spacing={16} justify="center">
          <Grid item>
            <Button variant="contained" color="primary" onClick={this.onClickControl}>
              { controlText }
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="inherit"
              className={classes.reset}
              onClick={this.onClickReset}
            >
              Reset
            </Button>
          </Grid>
        </Grid>

      </Grid>

    );
  }
}


const styles = theme => ({
  logo: {
    width: 256,
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
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
});


export default withStyles(styles)(Welcome);

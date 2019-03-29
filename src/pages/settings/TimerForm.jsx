import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import moment from 'moment';

import Paper from '../../components/Paper';
import BaseForm from './BaseForm';
import {
  toggleLongBreak,
  updateWorkDuration,
  updateBreakDuration,
  updateLongBreakDuration,
  updateWorkSessions,
} from '../../actions/settings';

const styles = theme => ({});

class TimerForm extends Component {
  onChange = (event) => {
    const { name, value } = event.target;

    console.log(`${name}: ${value}`);
  }

  render() {
    const {
      workDuration,
      breakDuration,
      longBreakEnabled,
      longBreakDuration,
      workSessions,
      dispatch,
    } = this.props;

    const form = [
      {
        label: 'Work Duration',
        type: 'number',
        value: moment.duration(workDuration, 'second').asMinutes(),
        onChange: value => dispatch(updateWorkDuration(
          value === '0' || value === '' ? 1 : Number(value),
        )),
      },
      {
        label: 'Break Duration',
        type: 'number',
        value: moment.duration(breakDuration, 'second').asMinutes(),
        onChange: value => dispatch(updateBreakDuration(
          value === '0' || value === '' ? 1 : Number(value),
        )),
      },
      {
        label: 'Long Break Enabled',
        type: 'switch',
        value: longBreakEnabled,
        onChange: () => dispatch(toggleLongBreak()),
        dependents: [
          {
            label: 'Long Break Duration',
            type: 'number',
            value: moment.duration(longBreakDuration, 'second').asMinutes(),
            onChange: value => dispatch(updateLongBreakDuration(
              value === '0' || value === '' ? 1 : Number(value),
            )),
          },
          {
            label: 'Work sessions before long break',
            type: 'number',
            value: workSessions,
            onChange: value => dispatch(updateWorkSessions(
              value === '0' || value === '' ? 1 : Number(value),
            )),
          },
        ],
      },
    ];

    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={5} lg={3} xl={2}>
          <Paper>
            <h2>Timer</h2>
            <BaseForm form={form} />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps({ settings }) {
  return {
    ...settings,
  };
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(TimerForm);

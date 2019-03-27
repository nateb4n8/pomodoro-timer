import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import moment from 'moment';

import Paper from '../../components/Paper';
import BaseForm from './BaseForm';
import { toggleLongBreak, updateWorkDuration } from '../../actions/settings';

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
            value: 10,
          },
          {
            label: 'Work sessions before long break',
            type: 'number',
            value: 2,
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

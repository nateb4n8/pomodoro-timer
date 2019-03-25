import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import TimerForm from './TimerForm';


const styles = theme => ({});


class Settings extends Component {
  render() {
    return (
      <TimerForm />
    );
  }
}


export default withStyles(styles)(Settings);

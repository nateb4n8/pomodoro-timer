import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import TimerForm from './TimerForm';


const styles = theme => ({});


class Settings extends Component {
  render() {
    return (
      <div>
        <h2>Settings</h2>
        <TimerForm />
      </div>
    );
  }
}


export default withStyles(styles)(Settings);

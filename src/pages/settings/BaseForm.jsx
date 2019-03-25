import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField, Switch, Grid, FormControlLabel, FormLabel,
} from '@material-ui/core';


const styles = theme => ({
  w100: {
    width: '100%',
  },
});


function formBuilder(form, onChange) {
  const formJSX = [];

  form.forEach((item) => {
    const {
      type, label, value, dependents = null,
    } = item;

    if (type === 'number') {
      formJSX.push((
        <NumberInput
          label={label}
          value={value}
          onChange={onChange}
          dependents={dependents}
        />
      ));
    }
    else if (type === 'switch') {
      formJSX.push((
        <SwitchInput
          label={label}
          value={value}
          onChange={onChange}
          dependents={dependents}
        />
      ));
    }
  });

  return formJSX;
}

function NumberInput({ label, value, onChange }) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      margin="normal"
    />
  );
}

function SwitchInput(props) {
  const {
    label, value, onChange, dependents,
  } = props;
  return (
    <Grid item container justify="space-between" alignItems="center">
      <FormLabel>{label}</FormLabel>
      <Switch
        checked={value}
        onChange={onChange}
        value={label}
        color="primary"
      />
      {value === true && formBuilder(dependents)}
    </Grid>
  );
}


function BaseForm(props) {
  const { form, onChange, classes } = props;

  const formJSX = formBuilder(form, e => console.log(e));


  return (
    <div className={classes.w100}>
      <Grid container direction="column">
        {formJSX}
      </Grid>
    </div>
  );
}


export default withStyles(styles)(BaseForm);

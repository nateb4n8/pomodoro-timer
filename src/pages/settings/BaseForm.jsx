import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField, Switch, Grid, FormLabel,
} from '@material-ui/core';


const styles = theme => ({
  w100: {
    width: '100%',
  },
});


function formBuilder(form) {
  const formJSX = [];

  for (let key = 0; key < form.length; key += 1) {
    const {
      type, label, value, dependents = null, onChange,
    } = form[key];

    if (type === 'number') {
      formJSX.push((
        <NumberInput
          key={key}
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
          key={key}
          label={label}
          value={value}
          onChange={onChange}
          dependents={dependents}
        />
      ));
    }
  }

  return formJSX;
}

function NumberInput({ label, value, onChange }) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={event => onChange(event.target.value)}
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
    <Grid item>
      <Grid item container justify="space-between" alignItems="center">
        <FormLabel>{label}</FormLabel>
        <Switch
          name="longBreakEnabled"
          checked={value}
          onChange={onChange}
          value={value}
          color="primary"
        />
      </Grid>
      <Grid item container direction="column">
        {value === true && formBuilder(dependents)}
      </Grid>
    </Grid>
  );
}


function BaseForm(props) {
  const { form, classes } = props;

  const formJSX = formBuilder(form);

  return (
    <div className={classes.w100}>
      <Grid container direction="column">
        {formJSX}
      </Grid>
    </div>
  );
}


export default withStyles(styles)(BaseForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Timer from './pages/timer/Timer';
import Statistics from './pages/statistics/Statistics';
import Settings from './pages/settings/Settings';
import BottomNavigation from './components/BottomNavigation';
import AppTheme from './components/AppTheme';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Router>
        <AppTheme>
          <Switch>
            <Route path="/statistics/" component={Statistics} />
            <Route path="/settings" component={Settings} />
            <Route path="/" component={Timer} />
          </Switch>
          <BottomNavigation />
        </AppTheme>
      </Router>
    );
  }
}


App.propTypes = {
  // classes: PropTypes.object.isRequired,
};


const styles = {};

function mapStateToProps(state) {
  return {};
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(App);

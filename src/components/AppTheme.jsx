import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#2979ff',
    },
    secondary: {
      main: '#ff9100',
    },
  },
});

const AppTheme = ({ children }) => (
  <CssBaseline>
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  </CssBaseline>
);

AppTheme.defaultProps = {
  children: [],
};

AppTheme.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default AppTheme;

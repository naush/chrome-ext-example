import React from 'react';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import { ReactComponent as Clock } from '../assets/clock.svg';

import theme from '../theme';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 300,
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function Popup() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.root}>
        <Clock />
      </Box>
    </ThemeProvider>
  );
}

export default Popup;

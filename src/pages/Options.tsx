import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import theme from '../theme';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function Options() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.root}>
        <Typography variant="h1">
          Pomodoro
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default Options;

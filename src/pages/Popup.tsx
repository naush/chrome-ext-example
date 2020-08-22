import React from 'react';

import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Display from '../components/Display';
import Control from '../components/Control';

import theme from '../theme';
import { Context } from '../store';
import Status from '../status';
import Pomodoro from '../pomodoro';


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
  display: {
    width: 300,
    height: 300,
  },
  control: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing(0, 5),
    width: '100%',
  },
}));

function Popup() {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(Context) as any;
  const pomodoro = new Pomodoro(state);

  React.useEffect(() => {
    let interval: any;

    if (state.status === Status.PLAY) {
      interval = setInterval(() => {
        const current = new Date().getTime();
        const progress = pomodoro.progress();

        if (progress >= 100) {
          dispatch({ payload: { start: current, current } });
        } else {
          dispatch({ payload: { current } });
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.root}>
        <Box className={classes.display}>
          <Display />
        </Box>
        <Box className={classes.control}>
          <Control />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Popup;

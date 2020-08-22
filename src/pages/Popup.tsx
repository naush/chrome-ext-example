import React from 'react';

import AlarmIcon from '@material-ui/icons/Alarm';
import StopIcon from '@material-ui/icons/Stop';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Display from '../components/Display';

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
          dispatch({
            payload: {
              ...state,
              start: current,
              current,
            },
          });
        } else {
          dispatch({
            payload: {
              ...state,
              current,
            },
          });
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
          {
            state.status === Status.STOP && (
              <>
                <Button
                  variant="outlined"
                  startIcon={<AlarmIcon />}
                  onClick={() => {
                    const now = new Date().getTime();

                    if (chrome.alarms) {
                      const workTime = now + (state.work * 60 * 1000);
                      const breakTime = workTime + (state.break * 60 * 1000);

                      chrome.alarms.create('work', {
                        when: workTime,
                      });

                      chrome.alarms.create('break', {
                        when: breakTime,
                      });
                    }

                    dispatch({
                      payload: {
                        ...state,
                        start: now,
                        current: now,
                        status: Status.PLAY,
                      },
                    });
                  }}
                >
                  Start
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => chrome.tabs && chrome.tabs.create({ url: chrome.runtime.getURL('index.html') })}
                >
                  Options
                </Button>
              </>
            )
          }
          {
            state.status === Status.PLAY && (
              <>
                <Button
                  variant="outlined"
                  startIcon={<StopIcon />}
                  onClick={() => {
                    if (chrome.alarms) {
                      chrome.alarms.clearAll();
                    }

                    dispatch({
                      payload: {
                        ...state,
                        status: Status.STOP,
                      },
                    });
                  }}
                >
                  Stop
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => chrome.tabs && chrome.tabs.create({ url: chrome.runtime.getURL('index.html') })}
                >
                  Options
                </Button>
              </>
            )
          }
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Popup;

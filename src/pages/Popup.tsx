import React from 'react';

import AlarmIcon from '@material-ui/icons/Alarm';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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
  links: {
    '& button:first-child': {
      margin: theme.spacing(0, 2, 0),
    },
  },
}));

enum Status {
  PLAY,
  STOP,
}

function Popup() {
  const classes = useStyles();

  const [control, setControl] = React.useState({
    start: new Date().getTime(),
    current: new Date().getTime(),
    status: Status.STOP,
  });

  const formatTime = (time: number) => {
    if (time < 10) {
      return `0${time}`;
    }

    return time;
  };

  const showTime = () => {
    const time = (control.current - control.start) / 1000;
    const minutes = formatTime(Math.floor(time / 60));
    const seconds = formatTime(Math.round(time % 60));

    return `${minutes}:${seconds}`;
  };

  React.useEffect(() => {
    let interval: any;

    if (control.status === Status.PLAY) {
      interval = setInterval(() => {
        setControl({
          ...control,
          current: new Date().getTime(),
        });
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
        {
          control.status === Status.STOP && <Clock />
        }
        {
          control.status === Status.PLAY && (
            <Box>
              {showTime()}
            </Box>
          )
        }
        <Box className={classes.links}>
          {
            control.status === Status.STOP && (
              <>
                <Button
                  variant="outlined"
                  startIcon={<AlarmIcon />}
                  onClick={() => {
                    const now = new Date().getTime();

                    setControl({
                      ...control,
                      start: now,
                      current: now,
                      status: Status.PLAY,
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
            control.status === Status.PLAY && (
              <>
                <Button
                  variant="outlined"
                  startIcon={<StopIcon />}
                  onClick={() => {
                    setControl({
                      ...control,
                      status: Status.STOP,
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

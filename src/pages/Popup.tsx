import React from 'react';

import AlarmIcon from '@material-ui/icons/Alarm';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import { ReactComponent as Clock } from '../assets/clock.svg';

import theme from '../theme';
import Storage from '../storage';
import Status from '../status';

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
  face: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.spacing(10),
  },
  control: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing(0, 4),
    width: '100%',
  },
}));

function Popup() {
  const classes = useStyles();

  const [control, setControl] = React.useState(Storage.load());

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
        Storage.save({
          ...control,
          current: new Date().getTime(),
        });

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
        <Box className={classes.display}>
          {
            control.status === Status.STOP && <Clock />
          }
          {
            control.status === Status.PLAY && (
              <Box className={classes.face}>
                {showTime()}
              </Box>
            )
          }
        </Box>
        <Box className={classes.control}>
          {
            control.status === Status.STOP && (
              <>
                <Button
                  variant="outlined"
                  startIcon={<AlarmIcon />}
                  onClick={() => {
                    const now = new Date().getTime();

                    Storage.save({
                      ...control,
                      start: now,
                      current: now,
                      status: Status.PLAY,
                    });

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
                    Storage.save({
                      ...control,
                      status: Status.STOP,
                    });

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

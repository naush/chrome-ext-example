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
  PAUSE,
  STOP,
}

function Popup() {
  const classes = useStyles();

  const [control, setControl] = React.useState({
    time: 0,
    status: Status.STOP,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.root}>
        <Clock />
        <Box className={classes.links}>
          {
            control.status === Status.STOP && (
              <>
                <Button
                  variant="outlined"
                  startIcon={<AlarmIcon />}
                  onClick={() => {
                    setControl({
                      ...control,
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
                  startIcon={<PauseIcon />}
                  onClick={() => {
                    setControl({
                      ...control,
                      status: Status.PAUSE,
                    });
                  }}
                >
                  Pause
                </Button>
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
              </>
            )
          }
          {
            control.status === Status.PAUSE && (
              <>
                <Button
                  variant="outlined"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => {
                    setControl({
                      ...control,
                      status: Status.PLAY,
                    });
                  }}
                >
                  Pause
                </Button>
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
              </>
            )
          }
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Popup;

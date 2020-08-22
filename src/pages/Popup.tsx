import React from 'react';

import AlarmIcon from '@material-ui/icons/Alarm';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import clsx from 'clsx';
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
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    gridColumnGap: 0,
    gridRowGap: 0,
  },
  progress: {
    gridArea: '1 / 1 / 2 / 2',
    alignSelf: 'center',
    justifySelf: 'center',
  },
  work: {
    zIndex: 2,

    '& .MuiCircularProgress-circle': {
      stroke: theme.palette.primary.main,
    },
  },
  break: {
    zIndex: 1,

    '& .MuiCircularProgress-circle': {
      stroke: theme.palette.secondary.main,
    },
  },
  track: {
    zIndex: 0,

    '& .MuiCircularProgress-circle': {
      stroke: theme.palette.action.hover,
    },
  },
  time: {
    zIndex: 1,
    fontSize: theme.spacing(7),
    gridArea: '1 / 1 / 2 / 2',
    alignSelf: 'center',
    justifySelf: 'center',
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

  const calculateTime = () => (
    (control.current - control.start) / 1000
  );

  const calculateProgress = () => {
    const time = calculateTime();
    const total = (control.work + control.break) * 60;
    return (time / total) * 100;
  };

  const isWork = () => (
    calculateTime() <= control.work * 60
  );

  const isBreak = () => (
    !isWork()
  );

  const showTime = () => {
    const time = calculateTime();
    const minutes = formatTime(Math.floor(time / 60));
    const seconds = formatTime(Math.round(time % 60));

    return `${minutes}:${seconds}`;
  };

  React.useEffect(() => {
    let interval: any;

    if (control.status === Status.PLAY) {
      interval = setInterval(() => {
        const current = new Date().getTime();
        const progress = calculateProgress();

        if (progress >= 100) {
          Storage.save({
            ...control,
            start: current,
            current,
          });

          setControl({
            ...control,
            start: current,
            current,
          });
        } else {
          Storage.save({
            ...control,
            current,
          });

          setControl({
            ...control,
            current,
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
          {
            control.status === Status.STOP && <Clock />
          }
          {
            control.status === Status.PLAY && (
              <Box className={classes.face}>
                {
                  isWork() && (
                    <>
                      <CircularProgress
                        className={clsx(classes.progress, classes.track)}
                        variant="static"
                        size={200}
                        value={100}
                      />
                      <CircularProgress
                        className={classes.progress}
                        variant="static"
                        size={200}
                        value={calculateProgress()}
                      />
                    </>
                  )
                }
                {
                  isBreak() && (
                    <>
                      <CircularProgress
                        className={clsx(classes.progress, classes.track)}
                        variant="static"
                        size={200}
                        value={100}
                      />
                      <CircularProgress
                        className={clsx(classes.progress, classes.break)}
                        variant="static"
                        size={200}
                        value={calculateProgress()}
                      />
                      <CircularProgress
                        className={clsx(classes.progress, classes.work)}
                        variant="static"
                        size={200}
                        value={(control.work / (control.work + control.break)) * 100}
                      />
                    </>
                  )
                }
                <Box className={classes.time}>
                  {showTime()}
                </Box>
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

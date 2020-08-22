import React from 'react';

import AlarmIcon from '@material-ui/icons/Alarm';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Display from '../components/Display';

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
  img: {
    width: '100%',
    height: '100%',
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
    padding: theme.spacing(0, 5),
    width: '100%',
  },
}));

function Popup() {
  const classes = useStyles();

  const [control, setControl] = React.useState(Storage.load());

  const calculateTime = () => (
    (control.current - control.start) / 1000
  );

  const calculateProgress = () => {
    const time = calculateTime();
    const total = (control.work + control.break) * 60;
    return (time / total) * 100;
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
          <Display
            control={control as any}
          />
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

                    if (chrome.alarms) {
                      const workTime = now + (control.work * 60 * 1000);
                      const breakTime = workTime + (control.break * 60 * 1000);

                      chrome.alarms.create('work', {
                        when: workTime,
                      });

                      chrome.alarms.create('break', {
                        when: breakTime,
                      });
                    }

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
                    if (chrome.alarms) {
                      chrome.alarms.clearAll();
                    }

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

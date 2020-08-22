import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { ReactComponent as Clock } from '../assets/clock.svg';
import Status from '../status';
import Pomodoro from '../pomodoro';

const useStyles = makeStyles((theme) => ({
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
}));

type DisplayProps = {
  control: any;
};

const Display = ({
  control,
}: DisplayProps) => {
  const classes = useStyles();
  const pomodoro = new Pomodoro(control);
  const workProgress = (control.work / (control.work + control.break)) * 100;

  if (control.status === Status.STOP) {
    return <Clock className={classes.img} />;
  }

  if (pomodoro.isWork()) {
    return (
      <Box className={classes.face}>
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
          value={pomodoro.progress()}
        />
        <Box className={classes.time}>
          {pomodoro.display()}
        </Box>
      </Box>
    );
  }

  return (
    <Box className={classes.face}>
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
        value={pomodoro.progress()}
      />
      <CircularProgress
        className={clsx(classes.progress, classes.work)}
        variant="static"
        size={200}
        value={workProgress}
      />
      <Box className={classes.time}>
        {pomodoro.display()}
      </Box>
    </Box>
  );
};

export default Display;

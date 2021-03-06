import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import HeadsetOutlinedIcon from '@material-ui/icons/HeadsetOutlined';

import Rating from '@material-ui/lab/Rating';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import clsx from 'clsx';
import { ReactComponent as Tomato } from '../assets/tomato.svg';
import { ReactComponent as TomatoEmpty } from '../assets/tomato_empty.svg';

import { ReactComponent as Moon } from '../assets/eggplant.svg';
import { ReactComponent as MoonEmpty } from '../assets/eggplant_empty.svg';

import theme from '../theme';
import { Context } from '../store';


const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    margin: theme.spacing(0),
  },
  subheader: {
    margin: theme.spacing(0, 0, 2),
  },
  field: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: theme.spacing(2),
  },
  display: {
    margin: theme.spacing(0, 2, 0),
    width: theme.spacing(18),
    justifyContent: 'flex-start',
  },
  work: {
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.primary.main,
  },
  break: {
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.secondary.main,
  },
  icon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

function Options() {
  const classes = useStyles();
  const MINUTES_PER_TOMATO = 5;
  const { state, dispatch } = React.useContext(Context) as any;

  const handleChange = (attribute: string) => (event: any, newValue: any) => {
    const time = Number(newValue) * MINUTES_PER_TOMATO;

    dispatch({
      payload: {
        [attribute]: time,
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.root}>
        <Typography variant="h1">
          Pomodoro
        </Typography>
        <Typography
          className={classes.subheader}
          variant="h5"
        >
          <span role="img" aria-label="wave">👋</span>
          {' '}
          Set up your favorite kitchen timer here
        </Typography>
        <Box className={classes.form}>
          <Box className={classes.field}>
            <Button
              className={clsx(classes.display, classes.work)}
              variant="outlined"
              startIcon={<WorkOutlineIcon />}
            >
              {state.work}
              {' '}
              minutes
            </Button>
            <Rating
              name="work"
              defaultValue={state.work / MINUTES_PER_TOMATO}
              precision={1}
              icon={<Tomato className={classes.icon} />}
              emptyIcon={<TomatoEmpty className={classes.icon} />}
              size="large"
              max={9}
              onChange={handleChange('work')}
            />
          </Box>
          <Box className={classes.field}>
            <Button
              className={clsx(classes.display, classes.break)}
              variant="outlined"
              startIcon={<HeadsetOutlinedIcon />}
            >
              {state.break}
              {' '}
              minutes
            </Button>
            <Rating
              name="break"
              defaultValue={state.break / MINUTES_PER_TOMATO}
              precision={1}
              icon={<Moon className={classes.icon} />}
              emptyIcon={<MoonEmpty className={classes.icon} />}
              size="large"
              max={3}
              onChange={handleChange('break')}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Options;

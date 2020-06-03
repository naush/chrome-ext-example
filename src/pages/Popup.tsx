import React from 'react';
import AlarmIcon from '@material-ui/icons/Alarm';
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

function Popup() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.root}>
        <Clock />
        <Box className={classes.links}>
          <Button
            variant="outlined"
            startIcon={<AlarmIcon />}
            onClick={() => {
              new Audio(`data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU${Array(1e3).join('123')}`).play();
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
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Popup;

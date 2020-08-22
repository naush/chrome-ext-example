import React from 'react';

import AlarmIcon from '@material-ui/icons/Alarm';
import Button from '@material-ui/core/Button';
import StopIcon from '@material-ui/icons/Stop';

import { Context } from '../store';
import Status from '../status';


function Control() {
  const { state, dispatch } = React.useContext(Context) as any;

  if (state.status === Status.STOP) {
    return (
      <>
        <Button
          variant="outlined"
          startIcon={<AlarmIcon />}
          onClick={() => {
            const now = new Date().getTime();

            if (chrome.alarms) {
              const workTime = now + (state.work * 60 * 1000);
              const breakTime = workTime + (state.break * 60 * 1000);
              chrome.alarms.create('work', { when: workTime });
              chrome.alarms.create('break', { when: breakTime });
            }

            dispatch({ payload: { start: now, current: now, status: Status.PLAY } });
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
    );
  }

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<StopIcon />}
        onClick={() => {
          if (chrome.alarms) {
            chrome.alarms.clearAll();
          }

          dispatch({ payload: { status: Status.STOP } });
        }}
      >
        Stop
      </Button>
      <Button
        variant="outlined"
        onClick={() => chrome.tabs?.create({ url: chrome.runtime.getURL('index.html') })}
      >
        Options
      </Button>
    </>
  );
}

export default Control;

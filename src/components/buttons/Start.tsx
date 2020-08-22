import React from 'react';

import AlarmIcon from '@material-ui/icons/Alarm';
import Button from '@material-ui/core/Button';

import Status from '../../status';
import { Context } from '../../store';

const Start = () => {
  const { state, dispatch } = React.useContext(Context) as any;

  return (
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
  );
};

export default Start;

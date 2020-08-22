import React from 'react';

import Button from '@material-ui/core/Button';
import StopIcon from '@material-ui/icons/Stop';

import { Context } from '../../store';
import Status from '../../status';

const Stop = () => {
  const { dispatch } = React.useContext(Context) as any;

  return (
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
  );
};

export default Stop;

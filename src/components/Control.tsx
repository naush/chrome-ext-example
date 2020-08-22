import React from 'react';

import Start from './buttons/Start';
import Stop from './buttons/Stop';
import Options from './buttons/Options';

import { Context } from '../store';
import Status from '../status';


function Control() {
  const { state } = React.useContext(Context) as any;

  if (state.status === Status.STOP) {
    return (
      <>
        <Start />
        <Options />
      </>
    );
  }

  return (
    <>
      <Stop />
      <Options />
    </>
  );
}

export default Control;

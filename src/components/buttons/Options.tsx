import React from 'react';

import Button from '@material-ui/core/Button';

const Options = () => (
  <Button
    variant="outlined"
    onClick={() => {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      }
    }}
  >
    Options
  </Button>
);

export default Options;

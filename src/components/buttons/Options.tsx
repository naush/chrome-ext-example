import React from 'react';

import Button from '@material-ui/core/Button';

const Options = () => (
  <Button
    variant="outlined"
    onClick={() => chrome.tabs && chrome.tabs.create({ url: chrome.runtime.getURL('index.html') })}
  >
    Options
  </Button>
);

export default Options;

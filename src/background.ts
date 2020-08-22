import Beep from './beep';

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // only run once after install
  }
});

chrome.alarms.onAlarm.addListener(() => {
  Beep.play(3);
});

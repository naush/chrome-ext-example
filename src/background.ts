import Beep from './beep';

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // only run once after install
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  console.log('alarm', alarm);
  // run when an alarm goes off
  Beep.play(3);
});

chrome.notifications.onButtonClicked.addListener(() => {
  // run when a notification is fired
});

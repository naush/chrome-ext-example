chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // only run once after install
  }
});

chrome.alarms.onAlarm.addListener(() => {
  // run when an alarm goes off
});

chrome.notifications.onButtonClicked.addListener(() => {
  // run when a notification is fired
});

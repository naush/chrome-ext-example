chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // only run once after install
  }
});

chrome.alarms.onAlarm.addListener(() => {
  // run when an alarm goes off
  new Audio(`data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU${Array(1e3).join('123')}`).play();
});

chrome.notifications.onButtonClicked.addListener(() => {
  // run when a notification is fired
});

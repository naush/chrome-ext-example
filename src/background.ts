import Beep from './beep';
import Local from './local';

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // only run once after install
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'break') {
    const state = Local.load();
    const now = new Date().getTime();
    const workTime = now + (state.work * 60 * 1000);
    const breakTime = workTime + (state.break * 60 * 1000);

    chrome.alarms.create('work', { when: workTime });
    chrome.alarms.create('break', { when: breakTime });

    Local.save({
      ...state,
      start: now,
      current: now,
    });
  }

  Beep.play(2);
});

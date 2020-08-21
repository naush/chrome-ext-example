import Status from './status';

class Storage {
  static defaults() {
    return {
      work: 25,
      break: 5,
      start: new Date().getTime(),
      current: new Date().getTime(),
      status: Status.STOP,
    };
  }

  static load() {
    const saved = localStorage.getItem('pomodoro');

    if (saved) {
      return JSON.parse(saved);
    }

    return this.defaults();
  }

  static save(state: any) {
    localStorage.setItem(
      'pomodoro',
      JSON.stringify(state),
    );
  }
}

export default Storage;

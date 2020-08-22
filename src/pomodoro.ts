class Pomodoro {
  state: any;

  constructor(state: any) {
    this.state = state;
  }

  progress() {
    const time = this.time();
    const total = (this.state.work + this.state.break) * 60;
    return (time / total) * 100;
  }

  display() {
    const time = this.time();
    const minutes = this.format(Math.floor(time / 60));
    const seconds = this.format(Math.round(time % 60));

    return `${minutes}:${seconds}`;
  }

  isWork() {
    return this.time() <= this.state.work * 60;
  }

  isBreak() {
    return !this.isWork();
  }

  private time() {
    return (this.state.current - this.state.start) / 1000;
  }

  private format = (time: number) => {
    if (time < 10) {
      return `0${time}`;
    }

    return time;
  };
}

export default Pomodoro;

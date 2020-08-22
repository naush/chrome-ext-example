class Beep {
  static play(times: number) {
    for (let count = 0; count < times; count += 1) {
      new Audio(`data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU${Array(1e3).join('123')}`).play();
    }
  }
}

export default Beep;

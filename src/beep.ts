class Beep {
  static play(times: number) {
    const audio = new Audio(`data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU${Array(1e3).join('123')}`);

    for (let count = 0; count < times; count += 1) {
      setTimeout(() => audio.play, 300 * count);
    }
  }
}

export default Beep;

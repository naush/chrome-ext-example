import chime from './assets/chime';

class Beep {
  static play(times: number) {
    const audio = new Audio(`data:audio/wav;base64,${chime}`);

    for (let count = 0; count < times; count += 1) {
      setTimeout(() => audio.play(), 500 * count);
    }
  }
}

export default Beep;

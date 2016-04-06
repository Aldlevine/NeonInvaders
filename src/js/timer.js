import * as C from "./constants";

export default class Timer {
  constructor() {
    this._time = 0;
    this.dt = 0;
    this.accumulator = 0;
  }

  init() {
    requestAnimationFrame(time => {
      this._time = time;
    });
  }

  get time() { return this._time; }
  set time(val) {
    this.dt = val - this._time;
    this.accumulator += this.dt;
    this._time = val;
  }
}

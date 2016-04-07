import * as C from "./constants";
import Evented from "./evented";

export default class FPS extends Evented{
  constructor() {
    super();
    this.frames = 0;
    this.min = Number.MAX_VALUE;
    this.max = 0;
    this.timeout = null;
  }

  add_frame() {
    this.frames++;
  }

  tic() {
    if( this.frames < this.min && this.frames > 0 ) this.min = this.frames;
    if( this.frames > this.max ) this.max = this.frames;
    this.dispatch('update', this.frames, this.min, this.max);
    this.frames = 0;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(_ => { this.tic() }, 1000);
  }
}

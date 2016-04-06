import * as C from "./constants";

export default class GFX {
  constructor(canvas) {
    this.cnv = canvas;
    this.ctx = canvas.getContext('2d');
    this.set_size();
  }

  set_size() {
    this.cnv.width = window.innerWidth;
    this.cnv.height = window.innerHeight;
  }

  get width() { return this.cnv.width };
  get height() { return this.cnv.height };
}

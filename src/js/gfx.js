import * as C from "./constants";

export default class GFX {
  constructor(canvas) {
    this.cnv = canvas;
    this.ctx = canvas.getContext('2d');

    let dpr = window.devicePixelRatio || 1;
    let bspr = this.ctx.webkitBackingStorePixelRatio ||
               this.ctx.mozBackingStorePixelRatio ||
               this.ctx.msBackingStorePixelRatio ||
               this.ctx.oBackingStorePixelRatio ||
               this.ctx.backingStorePixelRatio || 1;
    this.ratio = dpr / bspr;
    this.set_size();
  }

  set_size() {
    this.cnv.width = window.innerWidth * this.ratio;
    this.cnv.height = window.innerHeight * this.ratio;
  }

  scale() {
    this.ctx.scale(this.ratio, this.ratio);
  }

  get width() { return this.cnv.width };
  get height() { return this.cnv.height };
}

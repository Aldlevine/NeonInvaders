import * as C from "./constants";
import Evented from "./evented";
import Vec2 from "./vec2";

export default class Pointer extends Evented {
  constructor() {
    super();
    this._position = new Vec2();
    this.down_0 = false;
    this.down_1 = false;

    this.touch_0 = null;
    this.touch_1 = null;

    let dpr = window.devicePixelRatio || 1;
    /*let bspr = this.ctx.webkitBackingStorePixelRatio ||
               this.ctx.mozBackingStorePixelRatio ||
               this.ctx.msBackingStorePixelRatio ||
               this.ctx.oBackingStorePixelRatio ||
               this.ctx.backingStorePixelRatio || 1;*/
    this.ratio = dpr;
  }

  get position() {
    return new Vec2(this._position.x * this.ratio, this._position.y * this.ratio);
  }

  register_events() {
    window.addEventListener('mousedown', ev => {
      if( ev.button == 0 ) {
        this.down_0 = true;
        this.dispatch('down', 0);
      }
      else if( ev.button == 1 || ev.button == 2 ) {
        this.down_1 = true;
        this.dispatch('down', 1);
      }
      this._position.x = ev.pageX;
      this._position.y = ev.pageY;
    });

    window.addEventListener('mouseup', ev => {
      if( ev.button == 0) {
        this.down_0 = false;
        this.dispatch('up', 0);
      }
      else if( ev.button == 1 || ev.button == 2 ) {
        this.down_1 = false;
        this.dispatch('up', 1);
      }
    });

    window.addEventListener('mousemove', ev => {
      this._position.x = ev.pageX;
      this._position.y = ev.pageY;
      this.dispatch('move');
    });

    window.addEventListener('touchstart', ev => {
      this.touch_0 = ev.touches[0];
      this.touch_1 = ev.touches[1];

      let touches = ev.changedTouches;

      for( var i=0, ii=touches.length; i<ii; i++ ) {
        if( touches[i].identifier == (this.touch_0||{}).identifier ) {
          this.down_0 = true;
          this.dispatch('down', 0);
        }
        else if( touches[i].identifier == (this.touch_1||{}).identifier ) {
          this.down_1 = true;
          this.dispatch('down', 1);
        }
      }
      this._position.x = this.touch_0.pageX;
      this._position.y = this.touch_0.pageY;
    });

    window.addEventListener('touchend', ev => {
      let touches = ev.changedTouches;
      for( var i=0, ii=touches.length; i<ii; i++ ) {
        if( touches[i] .identifier == (this.touch_0||{}).identifier ) {
          this.touch_0 = touches[i];
          this.down_0 = false;
          this.dispatch('up', 0);
        }
        else if( touches[i].identifier == (this.touch_1||{}).identifier ) {
          this.touch_1 = touches[i];
          this.down_1 = false;
          this.dispatch('up', 1);
        }
      }
    });

    window.addEventListener('touchmove', ev => {
      ev.preventDefault();
      let touches = ev.changedTouches;
      for( var i=0, ii=touches.length; i<ii; i++ ) {
        if( touches[i].identifier == (this.touch_0||{}).identifier ) {
          this.touch_0 = touches[i];
          this._position.x = this.touch_0.pageX;
          this._position.y = this.touch_0.pageY;
          this.dispatch('move');
        }
        else if( touches[i].identifier == (this.touch_1||{}).identifer ) {
          this.touch_1 = touches[i];
        }
      }
    });

  }
}

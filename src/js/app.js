import * as C from "./constants";
import Evented from "./evented";
import GFX from "./gfx";
import Timer from "./timer";
import Pointer from "./pointer";
import Gnode from "./gnode";
import FPS from "./fps";

import Poly from "./poly";

export default class App extends Evented {
  constructor() {
    super();
    let canvas = document.querySelector('canvas');
    this.gfx = new GFX(canvas);
    this.timer = new Timer();
    this.pointer = new Pointer();
    this.scene = new Gnode();
    this.paused = false;

    if( C.DEBUG ) {
      this.fps = new FPS();
      document.documentElement.classList.add('debug');
    }

    this.register_events();
    this.init_loop();
  }

  register_events() {
    window.addEventListener('resize', ev => {
      this.gfx.set_size();
    });

    //window.addEventListener('blur', _ => {
    //  this.pause();
    //});

    //window.addEventListener('focus', _ => {
    //  this.resume();
    //});

   this.pointer.register_events();

    this.on('pause', _ => {
      document.documentElement.classList.add('paused');
      // PAUSE MENU
    });

    this.on('resume', _ => {
      document.documentElement.classList.remove('paused');
      // KILL PAUSE MENU
    });

    if( C.DEBUG ) {
      this.fps.tic();
      this.fps.on('update', (fps, min, max) => {
        let fps_div = document.querySelector('.frames');
        let min_div = document.querySelector('.min');
        let max_div = document.querySelector('.max');

        fps_div.innerHTML = `FPS: ${fps}`;
        min_div.innerHTML = `MIN: ${min}`;
        max_div.innerHTML = `MAX: ${max}`;
      });
    }
  }

  init_loop() {
    this.timer.init();
    this.tic();
  }

  pause() {
    this.dispatch('pause');
    this.paused = true;
  }

  resume() {
    this.dispatch('resume');
    this.paused = false;
    this.init_loop();
  }

  tic() {
    if( !this.paused ) {
      this.frame_request = requestAnimationFrame(time => {
        this.timer.time = time;
        this.tic();
      });
    }

    this.update();

    while( this.timer.accumulator >= C.FIXED_UPDATE_TIME ) {
      this.timer.accumulator -= C.FIXED_UPDATE_TIME;
      this.fixed_update(C.FIXED_UPDATE_TIME);
    }

    if( C.DEBUG ) this.fps.add_frame();
  }

  update() {
    let gfx = this.gfx;
    let ctx = gfx.ctx;
    ctx.clearRect(0, 0, gfx.width, gfx.height);

    this.scene.for_each(gnode => {
      gnode.on_update(this, this.timer.dt);
      if( gnode.render ) gnode.render(this);

      /*
      this.scene.for_each(gnode2 => {
        if( gnode == gnode2 ) return;
        if( gnode instanceof Poly && gnode2 instanceof Poly ) {
          let ips = gnode.intersect(gnode2);
          ips.forEach(p => {
            ctx.strokeStyle = '#f00';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI*2);
            ctx.closePath();
            ctx.stroke();
          })
        }
      });
      */

    });
  }

  fixed_update(dt) {
    this.scene.for_each(gnode => {
      gnode.on_fixed_update(this, dt);
    });
  }

}

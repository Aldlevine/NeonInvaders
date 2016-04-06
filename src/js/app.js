import * as C from "./constants";
import Evented from "./evented";
import GFX from "./gfx";
import Timer from "./timer";
import Pointer from "./pointer";
import Gnode from "./gnode";
import FPS from "./fps";

export default class App extends Evented {
  constructor() {
    super();
    let canvas = document.querySelector('canvas');
    this.gfx = new GFX(canvas);
    this.timer = new Timer();
    this.pointer = new Pointer();
    this.scene = new Gnode();
    this.paused = false;
    this.touch_0 = null;

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

    window.addEventListener('blur', _ => {
      this.pause();
    });

    window.addEventListener('focus', _ => {
      this.resume();
    });

    window.addEventListener('mousedown', ev => {
      if( ev.button == 0 ) this.pointer.down = true;
      this.pointer.position.x = ev.pageX;
      this.pointer.position.y = ev.pageY;
    });
    window.addEventListener('mouseup', ev => {
      if( ev.button  == 0) this.pointer.down = false;
    });
    window.addEventListener('mousemove', ev => {
      this.pointer.position.x = ev.pageX;
      this.pointer.position.y = ev.pageY;
    });

    window.addEventListener('touchstart', ev => {
      this.touch_0 = ev.touches[0];
      this.pointer.down = true;
      this.pointer.position.x = this.touch_0.pageX;
      this.pointer.position.y = this.touch_0.pageY;
    });
    window.addEventListener('touchend', ev => {
      if( ev.changedTouches[0] == this.touch_0 )
        this.pointer.down = false;
    });
    window.addEventListener('touchmove', ev => {
      ev.preventDefault();
      this.pointer.position.x = ev.touches[0].pageX;
      this.pointer.position.y = ev.touches[0].pageY;
    });

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
      requestAnimationFrame(time => {
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
    });
  }

  fixed_update(dt) {
    this.scene.for_each(gnode => {
      gnode.on_fixed_update(this, dt);
    });
  }

}

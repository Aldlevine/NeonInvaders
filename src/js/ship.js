import * as C from "./constants";
import Renderable from "./renderable";
import Vec2 from "./vec2";
import Shot from "./shot";

export default class Ship extends Renderable {
  constructor() {
    super();
    this.position = new Vec2();
    this.shot_interval = C.SHIP_SHOT_INTERVAL;
    this.shot_clock = 0;
  }

  on_update(app) {
    this.position.x = app.pointer.position.x;
    this.position.y = app.gfx.height - (75 * app.gfx.ratio);
  }

  on_fixed_update(app, dt) {
    if( app.pointer.down_0 ) {
      if( this.shot_clock == 0 || this.shot_clock >= this.shot_interval ) {
        this.shot_clock -= this.shot_interval;
        if( this.shot_clock < 0 ) this.shot_clock = 0;

        let shot = new Shot(
          this.position.clone(),
          new Vec2(0, C.SHIP_SHOT_SPEED),
          'hsl(225, 100%, 75%)'
        );
        app.scene.add_child(shot);

        this.shot_clock += dt;
      }
      else
      {
        this.shot_clock += dt;
      }
    }
    else {
      this.shot_clock = 0;
    }
  }

  render(app) {
    let gfx = app.gfx;
    let ctx = gfx.ctx;

    let path = new Path2D('M-16 36 L0 28 L16 36 L0 0 Z');
    ctx.strokeStyle = 'hsl(225, 100%, 75%)';
    ctx.lineWidth = 2;
    ctx.save();
    ctx.translate( this.position.x, this.position.y );
    gfx.scale();
    ctx.stroke(path);
    ctx.restore();

    //gfx.post_scale();
  }
}

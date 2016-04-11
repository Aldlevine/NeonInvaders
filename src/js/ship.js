import * as C from "./constants";
import Vec2 from "./vec2";
import Shot from "./shot";
import RigidBody from "./rigid-body";

export default class Ship extends RigidBody {
  constructor() {
    super();
    this.line_width = 2;
    this.stroke_style = "hsl(225, 100%, 75%)";
    // M-16 36 L0 28 L16 36 L0 0 Z
    this.points = [new Vec2(-16, 36), new Vec2(0, 28), new Vec2(16, 36), new Vec2(0, 0)];
    this.update_path();

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

        let shot = new Shot({
          position: this.position.clone(),
          velocity: new Vec2(0, C.SHIP_SHOT_SPEED),
          fill_style: 'hsl(225, 100%, 75%)'
        });
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
}

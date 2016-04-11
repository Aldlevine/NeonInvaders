import * as C from "./constants";
import RigidBody from "./rigid-body"
import Vec2 from "./vec2";

export default class Shot extends RigidBody {
  constructor(opts = {}) {
    super(opts);

    let interior_angle = Math.PI / 4;
    var master_point = new Vec2(Math.cos(Math.PI/8) * 8, Math.sin(Math.PI/8) * 8);
    for( var i=0, ii=8; i<ii; i++ ) {
      this.points.push(master_point.clone());
      var x = master_point.x * Math.cos(interior_angle) - master_point.y * Math.sin(interior_angle);
      var y = master_point.x * Math.sin(interior_angle) + master_point.y * Math.cos(interior_angle);
      master_point.x = x;
      master_point.y = y;
    }

    this.update_path();
  }

  on_update(app) {
    let gfx = app.gfx;
    if(
      this.position.x + C.SHOT_GRACE_ZONE < 0 ||
      this.position.x - C.SHOT_GRACE_ZONE > gfx.width ||
      this.position.y + C.SHOT_GRACE_ZONE < 0 ||
      this.position.y - C.SHOT_GRACE_ZONE > gfx.height
    ) app.scene.remove_child(this);
  }

  on_fixed_update(app, dt) {
    this.position.x += this.velocity.x * dt * app.gfx.ratio;
    this.position.y += this.velocity.y * dt * app.gfx.ratio;
  }

}

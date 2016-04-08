import * as C from "./constants";
import Poly from "./poly"
import Vec2 from "./vec2";

export default class Shot extends Poly {
  constructor(position, velocity, color) {
    super();
    this.position = position || new Vec2();
    //this.color = color || 'hsl(360, 75%, 75%)';
    this.fill_style = color || 'hsl(360, 75%, 75%)';
    //this.points = [ new Vec2(0, -7.5), new Vec2(7.5, 0), new Vec2(0, 7.5), new Vec2(-7.5, 0) ];

    let interior_angle = 3*Math.PI/4;
    var master_point = new Vec2(Math.cos(Math.PI/8) * 8, Math.sin(Math.PI/8) * 8);
    for( var i=0, ii=8; i<ii; i++ ) {
      this.points.push(master_point.clone());
      var x = master_point.x * Math.cos(interior_angle) - master_point.y * Math.sin(interior_angle);
      var y = master_point.x * Math.sin(interior_angle) + master_point.y * Math.cos(interior_angle);
      master_point.x = x;
      master_point.y = y;
    }

    this.update_path();

    this.velocity = velocity || new Vec2(0, -1);
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

  /*render(app) {
    let gfx = app.gfx;
    let ctx = gfx.ctx;

    let path = new Path2D();
    path.arc(this.position.x, this.position.y, 5 * gfx.ratio, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill(path);
  }*/

}

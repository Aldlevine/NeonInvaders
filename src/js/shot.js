import * as C from "./constants";
import Renderable from "./renderable";
import Vec2 from "./vec2";

export default class Shot extends Renderable {
  constructor(position, velocity, color) {
    super();
    this.position = position || new Vec2();
    this.velocity = velocity || new Vec2(0, -1);
    this.color = color || 'hsl(360, 75%, 75%)';
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

  render(app) {
    let gfx = app.gfx;
    let ctx = gfx.ctx;

    let path = new Path2D();
    path.arc(this.position.x, this.position.y, 5 * gfx.ratio, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill(path);
  }

}

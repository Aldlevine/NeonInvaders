import * as C from "./constants";
import Vec2 from "./vec2";
import Shot from "./shot";
import Poly from "./poly";

export default class Enemy extends Poly {
  constructor() {
    super();
    // M-24 0 L24 0 L24 2 L24 14 L20 14 L20 4 L4 10 L2 20 L0 20 L-2 20 L-4 10 L-20 4 L-20 14 L-24 14 L-24 2 Z
    this.points = [
      new Vec2(-24, 0), new Vec2(24, 0), new Vec2(24, 2), new Vec2(24, 14), new Vec2(20, 14), new Vec2(20, 4),
      new Vec2(4, 10), new Vec2(2, 20), new Vec2(0, 20), new Vec2(-2, 20), new Vec2(-4, 10), new Vec2(-20, 4),
      new Vec2(-20, 14), new Vec2(-24, 14), new Vec2(-24, 2)
    ];
    this.stroke_style = 'hsl(360, 75%, 75%)';
    this.fill_style = 'hsla(360, 75%, 75%, 0.5)';
    this.line_width = 2;
    this.update_path();

    this.mass = 10;
    this.health = 10;
    this.armor = 10;

  }

  on_update(app) {
    if(this.health <= 0) {
      app.scene.remove_child(this);
    }
  }

  on_fixed_update(app) {
    let gfx = app.gfx;
    let ctx = gfx.ctx;
    // Collision Stuff
    app.scene.for_each(node => {
      if( node instanceof Shot ) {
        if( this.intersect(node).length > 0 ) {
          app.scene.remove_child(node);
          this.hit(10);
        }
        /*ctx.save();
        ctx.translate( this.position.x, this.position.y );
        gfx.scale();
        if( ctx.isPointInPath(this.path, node.position.x, node.position.y) ) {
          app.scene.remove_child(node);
          this.hit(10);
        }
        ctx.restore();*/

      }
    });
    // AI Stuff
  }


  hit(damage) {
    this.health -= damage / this.armor;
  }
}

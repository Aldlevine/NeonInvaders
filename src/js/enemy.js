import * as C from "./constants";
import Renderable from "./renderable";
import Vec2 from "./vec2";
import Shot from "./shot";

export default class Enemy extends Renderable {
  constructor() {
    super();
    this.position = new Vec2();
    this.color = 'hsl(360, 75%, 75%)';
    this.path = new Path2D('M-24 0 L24 0 L24 2 L24 14 L20 14 L20 4 L4 10 L2 20 L0 20 L-2 20 L-4 10 L-20 4 L-20 14 L-24 14 L-24 2 Z');
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
        ctx.save();
        ctx.translate( this.position.x, this.position.y );
        gfx.scale();
        if( ctx.isPointInPath(this.path, node.position.x, node.position.y) ) {
          app.scene.remove_child(node);
          this.hit(10);
        }
        ctx.restore();
      }
    });

    // AI Stuff
  }

  render(app) {
    let gfx = app.gfx;
    let ctx = gfx.ctx;

    let path = this.path;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2 / gfx.ratio;
    ctx.save();
    ctx.translate( this.position.x, this.position.y );
    gfx.scale();
    ctx.stroke(path);
    ctx.restore();
  }

  hit(damage) {
    this.health -= damage / this.armor;
  }
}

// PATH
// M-24 0 L24 0 L24 2 L24 14 L20 14 L20 4 L4 10 L2 20 L0 20 L-2 20 L-4 10 L-20 4 L-20 14 L-24 14 L-24 2 Z

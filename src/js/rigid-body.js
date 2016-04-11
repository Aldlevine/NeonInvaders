import * as C from "./constants";
import Poly from "./poly";
import Vec2 from "./vec2";

export default class RigidBody extends Poly {

  constructor(opts = {}) {
    super(opts);

    this.velocity = opts.velocity || new Vec2();
    this.angular_velocity = opts.angular_velocity || 0;
    this.mass = opts.mass === undefined ? 1 : opts.mass;
    this.friction = opts.friction === undefined ? 1 : opts.friction;
    this.restitution = opts.restitution || 0;
  }

  // Returns Vec2 with penetration
  static penetrate(a, b) {

  }
}

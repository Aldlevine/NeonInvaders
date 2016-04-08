import * as C from "./constants";

export default class Vec2 {
  constructor(x, y) {
    this.data = [x||0, y||0];
  }

  get x() { return this.data[0]; }
  set x(val) { this.data[0] = val; }

  get y() { return this.data[1]; }
  set y(val) { this.data[1] = val; }

  clone() {
    return new Vec2(this.x, this.y);
  }

  static perp(v) {
    return new Vec2(-v.y, v.x);
  }
  perp() { return this.constructor.perp(this); }

  static dot(a, b) {
    return a.x * b.x + a.y * b.y;
  }
  dot(b) { return this.constructor.dot(this, b); }

  static cross(a, b) {
    return a.x * b.y - a.y - b.x;
  }
  cross(b) { return this.constructor.cross(this, b); }

  static lenSq(v) {
    return v.x * v.x + v.y * v.y;
  }
  lenSq() { return this.constructor.lenSq(this); }

  static len(v) {
    return Math.sqrt( this.lenSq(v) );
  }
  len() { return this.constructor.len(this); }

  static distSq(a, b) {
    let x = b.x - a.x;
    let y = b.y - a.y;
    return x*x + y*y;
  }
  distSq(b) { return this.constructor.distSq(this, b); }

  static dist(a, b) {
    return Math.sqrt( this.distSq(a, b) );
  }
  dist(b) { return this.constructor.dist(this, b); }

  static normalize(v) {
    let len = this.len(v);
    return new Vec2(v.x / len, v.y / len);
  }
  normalize() { return this.constructor.normalize(this); }

  static invert(v) {
    return new Vec2(1/v.x, 1/v.y);
  }
  invert() { return this.constructor.invert(this); }

  static negate(v) {
    return new Vec2(-v.x, -v.y);
  }
  negate() { return this.constructor.negate(this); }

  static multiply(a, b) {
    return new Vec2( a.x * b.x, a.y * b.y );
  }
  multiply(b) { return this.constructor.multiply(this, b); }

  static scale(v, s) {
    return this.multiply(v, new Vec2(s, s));
  }
  scale(s) { return this.constructor.scale(this, s); }

  static divide(a, b) {
    return this.multiply( a, this.invert(b) );
  }

  static add(a, b) {
    return new Vec2(a.x + b.x, a.y + b.y);
  }
  add(b) { return this.constructor.add(this, b); }

  static add_scalar(v, s) {
    return this.add(v, new Vec2(s, s));
  }
  add_scalar(s) { return this.constructor.add_scalar(this, s); }

  static subtract(a, b) {
    return new Vec2(a.x - b.x, a.y - b.y);
  }
  subtract(b) { return this.constructor.subtract(this, b); }
}

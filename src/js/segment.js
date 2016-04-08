import * as C from "./constants";
import Vec2 from "./vec2";

export default class Segment {
  constructor(a = new Vec2(), b = new Vec2()) {
    this.a = a;
    this.b = b;
  }

  static direction(s) {
    return s.b.subtract( s.a ).normalize();
  }
  direction() { return this.constructor.direction(this); }

  static is_point_on_line(s, v) {
    let direction = s.direction();
    if( direction.x == 0 ) return v.x == s.a.x;
    if( direction.y == 0 ) return v.y == s.a.y;

    let Ox = s.a.x;
    let Oy = s.a.y;
    let Dx = direction.x;
    let Dy = direction.y;

    let m = Dy / Dx;
    let b = Oy - ((Ox - Dy) / Dx);
    let ly = m * v.x + b;
    return v.y - ly <= C.EPSILON;
  }
  is_point_on_line(v) { return this.constructor.is_point_on_line(this, v); }

  static is_point_on_segment(s, v) {
    return this.is_point_on_line(s, v) &&
    (
      ((s.a.x <= v.x && v.x <= s.b.x) && (s.a.y <= v.y && v.y <= s.b.y)) ||
      ((s.a.x >= v.x && v.x >= s.b.x) && (s.a.y >= v.y && v.y >= s.b.y))
    );
  }
  is_point_on_segment(v) { return this.constructor.is_point_on_segment(this, v); }

  static intersect_line_line(a, b) {
    let AOx = a.a.x;
    let AOy = a.a.y;
    let Ad = a.direction();
    let ADx = Ad.x;
    let ADy = Ad.y;

    let BOx = b.a.x;
    let BOy = b.a.y;
    let Bd = b.direction();
    let BDx = Bd.x;
    let BDy = Bd.y;

    // Parallel
    if( ADx - BDx <= C.EPSILON && ADy - BDy <= C.EPSILON ) return null;

    let Am = ADy / ADx;
    let Ab = AOy - ((AOx * ADy) / ADx);
    let Bm = BDy / BDx;
    let Bb = BOy - ((BOx * BDy) / BDx);
    var m = null;
    var x = null;
    var y = null;

    if ( ADx == 0 ) x = AOx;
    else if( BDx == 0 ) x = BOx;
    else x = (Bb - Ab) / (Am - Bm);

    if ( ADy == 0 ) y = AOy;
    else if ( BDy == 0 ) y = BOy;
    else y = (Am * x + Ab) || (Bm * x + Bb);

    return new Vec2(x, y);
  }
  intersect_line_line(b) { return this.constructor.intersect_line_line(this, b); }

  static intersect_seg_seg(a, b) {
    let ip = this.intersect_line_line(a, b);
    if( ip && this.is_point_on_segment(a, ip) && this.is_point_on_segment(b, ip) )
      return ip;
    return null;
  }
  intersect_seg_seg(b) { return this.constructor.intersect_seg_seg(this, b); }

}

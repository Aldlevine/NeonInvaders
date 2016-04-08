import * as C from "./constants";
import Renderable from "./renderable";
import Vec2 from "./vec2";
import Segment from "./segment";

export default class Poly extends Renderable {
  /*constructor(opts = {}) {
    super();
    this.points = opts.points || [];
    this.position = opts.position || new Vec2();
    this.rotation = opts.rotation || 0;
    this.scale = opts.scale || 1;
    // TODO: Update to include backing store size
    this.hidpi_scale = window.devicePixelRatio || 1;

    this.fill_style = opts.fillStyle || null;
    this.stroke_style = opts.strokeStyle || null;
    this.line_width = opts.lineWidth || 0;

    this.path = new Path2D();
    this.update_path();
  }*/
  constructor({
    points = [],
    position = new Vec2(),
    rotation = 0,
    scale = 1,
    fill_style = null,
    stroke_style = null,
    line_width = null,
  } = {}) {
    super();
    this.points = points;
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
    this.hidpi_scale = window.devicePixelRatio || 1;
    this.fill_style = fill_style;
    this.stroke_style = stroke_style;
    this.line_width;

    this.path = new Path2D();
    this.update_path();
  }

  update_path() {
    if( this.points.length ) {
      let last_point = this.points[this.points.length - 1];
      this.path.moveTo( last_point.x, last_point.y );
      this.points.forEach( point => {
        this.path.lineTo(point.x, point.y);
      });
      this.path.closePath();
    }
  }

  get transformed() {

    let points = [];
    this.points.forEach( point => {
      // TODO: Rotate
      points.push( point.scale(this.scale * this.hidpi_scale).add(this.position) );
    });

    let poly = new this.constructor(this);
    poly.points = points;
    return poly;
  }

  get segments() {
    let segments = [];
    var last_point = this.points[this.points.length - 1];
    this.points.forEach( point => {
      segments.push( new Segment(last_point, point) );
      last_point = point;
    });
    return segments;
  }

  static intersect(a, b) {
    let a_segs = a.transformed.segments;
    let b_segs = b.transformed.segments;
    let ips = [];
    a_segs.forEach( a => {
      b_segs.forEach( b => {
        let ip = Segment.intersect_seg_seg(a, b);
        if ( ip ) ips.push(ip);
      });
    });
    return ips;
  }
  intersect(b) { return this.constructor.intersect(this, b); }

  render(app) {
    let gfx = app.gfx;
    let ctx = gfx.ctx;

    ctx.strokeStyle = this.stroke_style;
    ctx.lineWidth = this.line_width / gfx.ratio;
    ctx.fillStyle = this.fill_style;
    ctx.save();
    ctx.translate( this.position.x, this.position.y );
    // TODO: Rotate
    ctx.scale( this.scale * this.hidpi_scale, this.scale * this.hidpi_scale );
    if( this.stroke_style ) ctx.stroke(this.path);
    if( this.fill_style ) ctx.fill(this.path);
    ctx.restore();
  }
}

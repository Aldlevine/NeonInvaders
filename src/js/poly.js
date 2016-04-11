import * as C from "./constants";
import Renderable from "./renderable";
import Vec2 from "./vec2";
import Segment from "./segment";

export default class Poly extends Renderable {

  constructor(opts = {}) {
    super();
    this.points = opts.points || [];
    this.position = opts.position || new Vec2();
    this.rotation = opts.rotation || 0;
    this.scale = opts.scale || 1;
    // TODO: Update to include backing store size
    this.hidpi_scale = window.devicePixelRatio || 1;

    this.fill_style = opts.fill_style || null;
    this.stroke_style = opts.stroke_style || null;
    this.line_width = opts.line_width || null;

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
    let a_segs = a.segments;
    let b_segs = b.segments;
    let ips = [];
    a_segs.forEach( a_seg => {
      b_segs.forEach( b_seg => {
        let ip = Segment.intersect_seg_seg(a_seg.transform(a), b_seg.transform(b));
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
    ctx.rotate( this.rotation );
    ctx.scale( this.scale * this.hidpi_scale, this.scale * this.hidpi_scale );
    if( this.stroke_style ) ctx.stroke(this.path);
    if( this.fill_style ) ctx.fill(this.path);
    ctx.restore();

    /*this.points.forEach(point => {
      let t = point.transform(this);
      ctx.strokeStyle = '#f00';
      ctx.beginPath();
      ctx.arc(t.x, t.y, 2, 0, Math.PI*2);
      ctx.closePath();
      ctx.stroke();
    });*/
  }
}

import * as C from "./constants";
import Evented from "./evented";

export default class Gnode extends Evented {
  constructor() {
    super();
    this.children = [];
  }

  add_child(child) {
    if( this.children.indexOf(child) < 0 )
      this.children.push(child);
  }

  remove_child(child) {
    let index = -1;
    if((index = this.children.indexOf(child)) >= 0) {
      this.children.splice(index, 1);
    }
  }

  for_each(fn) {
    this.children.forEach(function(child, ...rest) {
      fn.call(this, child, ...rest);
      child.for_each(fn);
    });
  }

  on_update(app){}
  on_fixed_update(app){}
}

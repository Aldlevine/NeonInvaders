import * as C from "./constants";

export default class Vec2 {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  clone() {
    return new Vec2(this.x, this.y);
  }
}

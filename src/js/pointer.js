import * as C from "./constants";
import Evented from "./evented";
import Vec2 from "./vec2";

export default class Pointer extends Evented {
  constructor() {
    super();
    this.position = new Vec2();
    this.down = false;
  }
}

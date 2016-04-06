import * as C from "./constants";

export default class Evented {
  constructor() {
    this.events = {};
  }

  on(name, fn) {
    if( fn instanceof Function ) {
      this.events[name] = this.events[name] || [];
      this.events[name].push(fn);

    }
  }

  off(name, fn) {
    this.events[name] = this.events[name];
    let ev = this.events[name];
    let index = -1;
    if( ev && (index = ev.indexOf(fn)) > -1 )
      ev.splice(index, 1);
  }

  dispatch(name, ...args) {
    let ev = this.events[name];
    if(ev) {
      ev.forEach(fn => {
        fn.call(this, ...args);
      });
    }
  }
}

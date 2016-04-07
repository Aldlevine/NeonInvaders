import "canvas-5-polyfill";

import App from "./app";
import Ship from "./ship";

var app = new App();

app.scene.add_child( new Ship() );

import "canvas-5-polyfill";

import App from "./app";
import Ship from "./ship";
import Enemy from "./enemy";

var app = new App();

app.scene.add_child( new Ship() );

var enemy_1 = new Enemy();
enemy_1.position.x = app.gfx.width / 2;
enemy_1.position.y = 25 * app.gfx.ratio;
app.scene.add_child( enemy_1 );

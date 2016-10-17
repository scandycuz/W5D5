const Asteroid = require('./asteroid.js');
const Bullet = require('./bullet.js');
const GameView = require('./game_view.js');
const Game = require('./game.js');
const Ship = require('./ship.js');
const Util = require('./util.js');
const MovingObject = require('./moving_object.js');

document.addEventListener( "DOMContentLoaded", () => {
  let canvasEl = document.getElementById("game-canvas");
  const ctx = canvasEl.getContext("2d");
  const game = new Game({
    dimX: 900,
    dimY: 500,
    numAsteroids: 10,
    background: "black"
  });
  window.game = game;

  canvasEl.width = game.DIM_X;
  canvasEl.height = game.DIM_Y;
  canvasEl.style.backgroundColor = game.BACKGROUND;
  new GameView(game, ctx).start();
});

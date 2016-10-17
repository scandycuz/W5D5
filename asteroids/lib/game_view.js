const Game = require('./game.js');


function GameView (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.ship = this.game.ship;
}

GameView.prototype.start = function() {
  this.bindKeyHandlers();
  setInterval( () => {
    this.game.drawObjects(this.ctx);
    this.game.step();
  }, 20);
}

GameView.MOVES = {
  "w": 'forward',
  "a": 'left',
  "s": 'back',
  "d": 'right',
};

GameView.prototype.bindKeyHandlers = function() {
  const ship = this.ship;
  const ctx = this.ctx;

  Object.keys(GameView.MOVES).forEach((k) => {
    let move = GameView.MOVES[k];
    key(k, function () { ship.power(move, ctx); });
  });
}

module.exports = GameView;

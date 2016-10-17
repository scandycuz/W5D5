const Util = require('./util');
const Asteroid = require('./asteroid');
const Ship = require('./ship');

function Game (options) {
  this.DIM_X = options["dimX"];
  this.DIM_Y = options["dimY"];
  this.NUM_ASTEROIDS = options["numAsteroids"];
  this.BACKGROUND = options["background"];
  this.asteroids = [];
  this.allObjects = [];
  this.addShip(this);

  for (i = 0; i < this.NUM_ASTEROIDS; i ++) {
    this.addAsteroid(this);
  }
}

Game.prototype.randomPosition = function() {
  return [
    Math.random() * this.DIM_X,
    Math.random() * this.DIM_Y
  ]
}

Game.prototype.addShip = (gameInst) => {
  let ship = new Ship({game: gameInst})
  gameInst.ship = ship;
  gameInst.allObjects.push(ship);
}

Game.prototype.addAsteroid = (gameInst, pos) => {
  if (pos == null) {
    this.pos = gameInst.randomPosition();
  }
  else {
    this.pos = pos;
  }
  newAsteroid = new Asteroid({game: gameInst, pos: this.pos})
  gameInst.asteroids.push(newAsteroid);
  gameInst.allObjects.push(newAsteroid);
}

Game.prototype.drawObjects = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.allObjects.forEach((object) => {
    object.draw(ctx);
  });
}

Game.prototype.moveObjects = function () {
  this.allObjects.forEach((object) => {
    object.move();
  });
}

Game.prototype.wrap = function(pos) {
  let xDim = pos[0]
  let yDim = pos[1]
  if (xDim < -100 || xDim > this.DIM_X + 100) {
    return "xWrapped";
  }
  if (yDim < -100 || yDim > this.DIM_Y + 100) {
    return "yWrapped";
  }
}

Game.prototype.checkCollisions = function () {
  for (j = 0; j < this.allObjects.length; j++) {
    for (k = j + 1; k < this.allObjects.length; k++) {
      let obj1 = this.allObjects[j];
      let obj2 = this.allObjects[k];
      if (obj1.isCollidedWith(obj2)) {
        let collision = obj2.collideWith(obj1);
        if (collision) return true;
      }
    }
  }
}

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
}

Game.prototype.remove = function(object) {
  let objectIdx = this.allObjects.indexOf(object);
  this.allObjects.splice(objectIdx, 1)
}

module.exports = Game;

const MovingObject = require('./moving_object');
const Util = require('./util');

const DEFAULTS = {
  COLOR: "black",
  OUTLINE: "white",
  RADIUS: 50
}

function Ship(options) {
  this.game = options.game;
  options.color = DEFAULTS.COLOR;
  options.outline = DEFAULTS.OUTLINE;
  options.vel = new Victor(0, 0);
  options.radius = 12;
  options.pos = this.game.randomPosition();

  MovingObject.call(this, options);
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
  this.vel = new Victor(0, 0);
};

Ship.prototype.move = function() {
  let wrapped = game.wrap(this.pos);
  if (wrapped === "xWrapped") {
    vec2 = new Victor(-1, 1);
    this.vel.multiply(vec2)
  }
  else if (wrapped === "yWrapped") {
    vec2 = new Victor(1, -1);
    this.vel.multiply(vec2)
  }
  this.pos[0] += this.vel.toArray()[0];
  this.pos[1] += this.vel.toArray()[1];
}

Ship.prototype.power = function(impulse) {
  if (impulse === 'forward') {
    if (this.vel.toArray()[0] === 0 && this.vel.toArray()[1] === 0) {
      this.vel = new Victor(1,0);
    }
    else {
      this.vel.multiply(new Victor(1.4, 1.4));
    }
  }
  else if (impulse === 'left') {
    this.vel.rotate(-0.75);
  }
  else if (impulse === 'right') {
    this.vel.rotate(0.75);
  }
  else if (impulse === 'back') {
    if (this.vel.toArray()[0] < 1 && this.vel.toArray()[1] < 1) {
      this.vel = new Victor(0,0);
    }
    else {
      this.vel.divide(new Victor(1.4, 1.4));
    }
  }
}


module.exports = Ship;

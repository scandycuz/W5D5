const MovingObject = require('./moving_object');
const Ship = require('./ship');
const Util = require('./util');

const DEFAULTS = {
  COLOR: "black",
  OUTLINE: "white",
  RADIUS: 50,
  SPEED: 2
}

function Asteroid(options) {
  options.color = DEFAULTS.COLOR;
  options.outline = DEFAULTS.OUTLINE;
  options.pos = options.pos;
  options.vel = options.vel || this.randomVec(DEFAULTS.SPEED);
  options.radius = ((Math.random() + 0.2) * 50);

  MovingObject.call(this, options);
}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.randomVec = function(length) {
  return [
    ((Math.random() * 2) - 1) * length * 1.1,
    ((Math.random() * 2) - 1) * length * 1.1
  ];
}

Asteroid.prototype.collideWith = (otherObject) => {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  }
}

module.exports = Asteroid;

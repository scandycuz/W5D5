const Util = require('./util.js');

function MovingObject (options) {
  this.game = options.game;
  this.pos = options.pos;
  this.vel = options.vel;
  this.outline = options.outline;
  this.radius = options.radius;
  this.color = options.color;
}

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;

  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = this.outline;

  ctx.stroke();
  ctx.fill();
}

MovingObject.prototype.move = function() {
  let wrapped = game.wrap(this.pos);
  if (wrapped === "xWrapped") {
    this.vel[0] = this.vel[0] * -1;
  }
  else if (wrapped === "yWrapped") {
    this.vel[1] = this.vel[1] * -1;
  }
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
}

MovingObject.prototype.isCollidedWith = function(otherObject) {
  let dist = Util.dist(this.pos, otherObject.pos);
  return dist < this.radius + otherObject.radius;
}

MovingObject.prototype.collideWith = function(otherObject, game) {
  // empty
}

module.exports = MovingObject;











//

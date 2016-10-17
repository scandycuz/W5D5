/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(1);
	const Bullet = __webpack_require__(4);
	const GameView = __webpack_require__(5);
	const Game = __webpack_require__(6);
	const Ship = __webpack_require__(7);
	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(2);

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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(2);
	const Ship = __webpack_require__(7);
	const Util = __webpack_require__(3);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Util = {
	  dist (pos1, pos2) {
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  },

	  inherits (ChildClass, BaseClass) {
	    function Surrogate () { this.constructor = ChildClass; }
	    Surrogate.prototype = BaseClass.prototype;
	    ChildClass.prototype = new Surrogate();
	  }
	}

	// Magnitude of vector:
	// Norm([x_1, y_1]) = Dist([0, 0], [x_1, y_1])

	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(2);

	const Bullet = function() {}

	module.exports = Bullet;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(6);


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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const Asteroid = __webpack_require__(1);
	const Ship = __webpack_require__(7);

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(2);
	const Util = __webpack_require__(3);

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


/***/ }
/******/ ]);
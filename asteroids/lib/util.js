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

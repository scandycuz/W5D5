// function sum () {
//   let sum = 0;
//   let args =Array.from(arguments)
//   args.forEach((el) => {
//     sum += el;
//   });
//   return sum;
// }

// function sum (...args) {
//   let sum = 0;
//   args.forEach((el) => {
//     sum += el;
//   });
//   return sum;
// }
//
// console.log(sum(1,2,3,4));

// Function.prototype.myBind = function(context) {
//   let that = this;
//   let args1 = Array.from(arguments).slice(1);
//
//   return function() {
//     let args2 = Array.from(arguments);
//     that.apply(context, args1.concat(args2));
//   }
// }

// Function.prototype.myBind = function(context, ...args1) {
//   let that = this;
//
//   return function(...args2) {
//     that.apply(context, args1.concat(args2));
//   }
// }
//
//
// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//
//   says(sound, person) {
//     console.log(`${this.name} says ${sound} to ${person}!`);
//     return true;
//   }
// }
//
// const markov = new Cat("Markov");
// const breakfast = new Cat("Breakfast");
//
// markov.says("meow", "Ned");
// // Markov says meow to Ned!
// // true
//
// markov.says.myBind(breakfast, "meow", "Kush")();
// // Breakfast says meow to Kush!
// // true
//
// markov.says.myBind(breakfast)("meow", "a tree");
// // Breakfast says meow to a tree!
// // true
//
// markov.says.myBind(breakfast, "meow")("Markov");
// // Breakfast says meow to Markov!
// // true
//
// const notMarkovSays = markov.says.myBind(breakfast);
// notMarkovSays("meow", "me");
// // Breakfast says meow to me!
// // true

function curriedSum(numArgs) {
  let numbers = [];
  function _curriedSum(number) {
    numbers = numbers.concat(number);
    if (numbers.length === numArgs) {
      let sum = 0;
      for (i = 0; i < numbers.length; i++) {
        sum += numbers[i];
      }
      return sum;
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}

// const sum = curriedSum(4);
// console.log(sum(5)(30)(20)(2)); // => 56


Function.prototype.curry = function(numArgs) {
  let that = this;
  let numbers = [];
  function _curry(number) {
    numbers.push(number);
    if (numbers.length === numArgs) {
      return that.apply(null, numbers);
    } else {
      return _curry;
    }
  }
  return _curry;
}

function sum(...args) {
  console.log(args);
  let sum = 0;
  args.forEach((arg) => {
    sum += arg;
  });
  return sum;
}

// you'll write `Function#curry`!
let f1 = sum.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
f1 = f1(4); // [Function] // sumThree.curry(3)(4);
f1 = f1(20); // [Function] // sumThree.curry(3)(4)(20)
console.log(f1 = f1(6)); // = 30

// or more briefly:
// sumThree.curry(3)(4)(20)(6); // == 30
















//

const lodashLazy = require("./00-lodash-lazy");
const lodash = require("./00-lodash");
const classic = require("./01-classic");
const functional = require("./02-functional");
const reducer = require("./03-reducer");
const reducerWithReducingFn = require("./04-reducer-with-reducing-fn");
const reducerComposition = require("./05-reducer-composition");
const compose = require("./06-compose");
const transduce = require("./07-transduce");

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const allSteps = [
  lodashLazy,
  lodash,
  classic,
  functional,
  reducer,
  reducerWithReducingFn,
  reducerComposition,
  compose,
  transduce,
];

allSteps.forEach(fn => {
  console.log(fn(arr));
});

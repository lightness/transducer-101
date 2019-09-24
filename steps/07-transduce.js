const { inc, isEven, double } = require("../constants");

const filterReducer = predicate => reducing => (acc, cur) =>
  predicate(cur) ? reducing(acc, cur) : acc;

const mapReducer = transform => reducing => (acc, cur) =>
  reducing(acc, transform(cur));

const concat = (acc, cur) => [...acc, cur];

const compose = (...reducers) => (reducing) => reducers.reduceRight((acc, cur) => cur(acc), reducing);

const xform = compose(
  mapReducer(inc),
  filterReducer(isEven),
  mapReducer(double)
);

const transduce = (xform, reducing, initial, arr) => arr.reduce(xform(reducing), initial);

module.exports = function(arr) {
  return transduce(xform, concat, [], arr);
};
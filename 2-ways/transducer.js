const { inc, isEven, double } = require("../constants");

const filterReducer = predicate => reducing => (acc, cur) =>
  predicate(cur) ? reducing(acc, cur) : acc;
const mapReducer = transform => reducing => (acc, cur) =>
  reducing(acc, transform(cur));

const concat = (acc, cur) => {
  acc.push(cur);

  return acc;
};

const compose = (...reducers) => (reducing) => reducers.reduceRight((acc, cur) => cur(acc), reducing);

const composedReducer = compose(
  mapReducer(inc),
  filterReducer(isEven),
  mapReducer(double)
)(concat);

module.exports = function(arr) {
  return arr.reduce(composedReducer, []);
};

const { inc, isEven, double } = require("../constants");

const filterReducer = predicate => reducing => (acc, cur) =>
  predicate(cur) ? reducing(acc, cur) : acc;

const mapReducer = transform => reducing => (acc, cur) =>
  reducing(acc, transform(cur));

const concat = (acc, cur) => [...acc, cur];
const sum = (acc, cur) => acc + cur;

const compose = (...reducers) => (reducing) => reducers.reduceRight((acc, cur) => cur(acc), reducing);

const composedReducer = compose(
  mapReducer(inc),
  filterReducer(isEven),
  mapReducer(double)
)(concat);

// map(doble)(concat)
// filter(isEven)(map(doble)(concat))
// map(inc)(filter(isEven)(map(doble)(concat)))

module.exports = function(arr) {
  return arr.reduce(composedReducer, []);
}

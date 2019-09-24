const { inc, isEven, double } = require("../constants");

const filterReducer = predicate => reducing => (acc, cur) =>
  predicate(cur) ? reducing(acc, cur) : acc;

const mapReducer = transform => reducing => (acc, cur) =>
  reducing(acc, transform(cur));

const concat = (acc, cur) => [...acc, cur];

const composedReducer = mapReducer(inc)(
  filterReducer(isEven)(
    mapReducer(double)(concat)
  )
);

module.exports = function(arr) {
  return arr.reduce(composedReducer, []);
}

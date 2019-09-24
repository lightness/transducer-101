const { inc, isEven, double } = require("../constants");

const filterReducer = predicate => (acc, cur) =>
  predicate(cur) ? [...acc, cur] : acc;

const mapReducer = transform => (acc, cur) => [...acc, transform(cur)];

module.exports = function(arr) {
  return arr
    .reduce(mapReducer(inc), [])
    .reduce(filterReducer(isEven), [])
    .reduce(mapReducer(double), [])
};

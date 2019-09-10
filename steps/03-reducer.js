const { arr, inc, isEven, double } = require("./constants");

const filterReducer = predicate => (acc, cur) =>
  predicate(cur) ? [...acc, cur] : acc;
const mapReducer = transform => (acc, cur) => [...acc, transform(cur)];

console.log(
  arr
    .reduce(mapReducer(inc), [])
    .reduce(filterReducer(isEven), [])
    .reduce(mapReducer(double), [])
);

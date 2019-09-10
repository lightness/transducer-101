const { arr, inc, isEven, double } = require("./constants");

const filter = (arr, predicate) =>
  arr.reduce((acc, cur) => (predicate(cur) ? [...acc, cur] : acc), []);
const map = (arr, transform) =>
  arr.reduce((acc, cur) => [...acc, transform(cur)], []);

console.log(map(filter(map(arr, inc), isEven), double));

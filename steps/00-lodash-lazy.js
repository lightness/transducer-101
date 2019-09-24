const { inc, isEven, double } = require("../constants");
const _ = require("lodash");

module.exports = function(arr) {
  return _(arr)
    .map(inc)
    .filter(isEven)
    .map(double)
    .value();
}
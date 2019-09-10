const { inc, isEven, double } = require("../constants");

module.exports = function(arr) {
  return arr
    .map(inc)
    .filter(isEven)
    .map(double);
}

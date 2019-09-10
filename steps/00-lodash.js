const { inc, isEven, double } = require("./constants");
const map = require("lodash/map");
const filter = require("lodash/filter");

module.exports = function(arr) {
  return map(
    filter(
      map(arr, inc),
      isEven,
    ),
    double,
  );
}

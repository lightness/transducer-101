const { sum, map, compose, transduce } = require('../../lib');

const xform = compose(
  map(x => x.split(' ')[2]),
  map(Number)
);

const extract = gcOutput => 
  transduce(
    xform, 
    sum, 
    0,
    gcOutput.match(/\) MB, (\d+\.\d) \//g),
  );

module.exports = extract;

const { max, map, compose, transduce } = require('../../lib');

const xform = compose(
  map(x => x.split(' ')[1]),
  map(Number)
);

const extract = gcOutput => 
  transduce(
    xform, 
    max, 
    0,
    gcOutput.match(/[^>] (\d+\.\d) \(/g),
  );

module.exports = extract;

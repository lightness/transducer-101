const filter = predicate => reducing => (acc, cur) =>
  predicate(cur) ? reducing(acc, cur) : acc;

const map = transform => reducing => (acc, cur) =>
  reducing(acc, transform(cur));

const apush = (acc, cur) => {
  acc.push(cur);

  return acc;
};

const max = (acc, cur) => acc > cur ? acc : cur;

const sum = (acc, cur) => acc + cur;

const compose = (...reducers) => (reducing) => reducers.reduceRight((acc, cur) => cur(acc), reducing);

const transduce = (xform, reducing, initial, arr) => arr.reduce(xform(reducing), initial);

module.exports = {
  transduce,
  compose,
  filter,
  map,
  apush,
  max,
  sum
}
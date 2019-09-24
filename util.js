const rnd = () => Math.floor(Math.random() * 1000);
const createArray = n => new Array(n).fill(null).map(rnd);

const loop = f => (from = 0, to = 10) => {
  const recursiveCall = async N => {
    await f(N);

    if (N < to) {
      return recursiveCall(N + 1);
    }
  };

  return recursiveCall(from);
};

const toFixed = precision => n => Number.parseFloat(n.toFixed(precision));

module.exports = {
  rnd,
  createArray,
  loop,
  toFixed,
};

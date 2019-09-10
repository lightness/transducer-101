const measure = require("./measure");
const chalk = require("chalk");
const { persist } = require("./persistance");
const { loop } = require("../util");

function loop(from = 0, to = 10) {
  const recursiveCall = async N => {
    console.log(`Running benchmark for array of ${N} items`);

    const result = await measure(N);
    console.log(`Classic: ${result.classic}`);
    console.log(`Transducer: ${result.transducer}`);
    console.log(`Factor: ${chalk.green(result.transducer / result.classic)}`);

    await persist(N, result);

    if (N < to) {
      return recursiveCall(N + 1);
    }
  };

  return recursiveCall(from);
}

module.exports = loop;

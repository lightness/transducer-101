const chalk = require('chalk');
const Redis = require('ioredis');

const CLASSIC = "classic";
const TRANSDUCER = "transducer";
const LAST_MEASURED = "GC_LAST_MEASURED";
const COLLECTION = {
  [CLASSIC]: "GC_MEASURE_CLASSIC",
  [TRANSDUCER]: "GC_MEASURE_TRANSDUCER",
};

const PORT = process.env.REDIS_PORT || 6379;

const redis = new Redis(PORT);

const save = async (n, alg, data) => {
  await redis.hset(COLLECTION[alg], String(n), data);
  console.log(`GC output for ${n} symbols for "${alg}" algorith saved`);
};

const fetch = async (n, alg) => {
  return redis.hget(COLLECTION[alg], String(n));
}

const saveLastMeasured = async (n) => {
  await redis.set(LAST_MEASURED, n);
  console.log(`Last measured updated: ${chalk.green(n)}`);
};

const getLastMeasured = async () => {
  const lastMeasured = await redis.get(LAST_MEASURED);
  console.log(`Last measured: ${chalk.red(lastMeasured)}`);

  return Number(lastMeasured);
};

const disconnect = () => {
  redis.disconnect();
}

module.exports = {
  save,
  fetch,
  disconnect,
  saveLastMeasured,
  getLastMeasured,
};

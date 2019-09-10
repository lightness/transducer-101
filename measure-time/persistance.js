const Redis = require('ioredis');

const PORT = process.env.REDIS_PORT || 6379;
const RESULTS_CLASSIC_KEY = "MEASURE_CLASSIC";
const RESULTS_TRANSDUCER_KEY = "MEASURE_TRANSDUCER";
const LAST_MEASURED_KEY = "LAST_MEASURED";

const redis = new Redis(PORT);

async function persist(n, result) {
  await redis.hset(RESULTS_CLASSIC_KEY, String(n), result.classic);
  await redis.hset(RESULTS_TRANSDUCER_KEY, String(n), result.transducer);
  await redis.set(LAST_MEASURED_KEY, n);
}

async function fetch(type, n) {
  const key = ((t) => {
    switch (t) {
      case 'classic':
        return RESULTS_CLASSIC_KEY;
      case 'transducer':
        return RESULTS_TRANSDUCER_KEY;
      default:
        return null;
    }
  })(type);

  return redis.hget(key, String(n));
}

async function getLastMeasured() {
  const lastMeasured = await redis.get(LAST_MEASURED_KEY);

  return Number(lastMeasured);
}

module.exports = {
  persist, 
  fetch,
  getLastMeasured,
};

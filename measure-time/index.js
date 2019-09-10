const loop = require('./loop');
const { getLastMeasured } = require('./persistance');

const TO = 10000;
const FROM = 0;

async function run() {
  const lastMeasured = (await getLastMeasured()) || FROM;

  await loop(lastMeasured + 1, TO);

  console.log('Done');
}

run();
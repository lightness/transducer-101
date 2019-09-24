const fs = require('fs');
const { parse } = require('json2csv');
const { toFixed } = require('../../util');
const { fetch, getLastMeasured, disconnect } = require('../persistance');
const maxHeapUsedMetric = require('./max-heap-used-metric');
const sumGcTimeMetric = require('./sum-gc-time-metric');

const getFileName = n => __dirname + `/out/Report-${n}-${Date.now()}.csv`;

async function createReport() {
  const N = await getLastMeasured();
  const data = [];
  let cumulativeGcTimeDiff = 0;

  for (let i = 1; i <= N; i++) {
    console.log(`Fetching data for: ${i}`);

    const [classic, transducer] = await Promise.all([
      fetch(i, 'classic'),
      fetch(i, 'transducer'),
    ]);

    const [maxHeapSizeClassic, maxheapSizeTransducer] = [classic, transducer].map(maxHeapUsedMetric);
    const [sumGcTimeClassic, sumGcTimeTransducer] = [classic, transducer].map(sumGcTimeMetric);

    cumulativeGcTimeDiff += (sumGcTimeClassic - sumGcTimeTransducer);

    data.push({
      n: i, 
      maxHeapSizeClassic: toFixed(1)(maxHeapSizeClassic),
      maxheapSizeTransducer: toFixed(1)(maxheapSizeTransducer),
      sumGcTimeClassic: toFixed(1)(sumGcTimeClassic),
      sumGcTimeTransducer: toFixed(1)(sumGcTimeTransducer),
      cumulativeGcTimeDiff: toFixed(1)(cumulativeGcTimeDiff),
    });
  }

  const csv = parse(data, { 
    fields: [
      'n', 
      'maxHeapSizeClassic', 
      'maxheapSizeTransducer', 
      'sumGcTimeClassic', 
      'sumGcTimeTransducer',
      'cumulativeGcTimeDiff'
    ],
    header: process.env.HEADER !== 'false',
  });
  const fileName = getFileName(N);

  fs.writeFileSync(fileName, csv);

  return fileName;
}

createReport().then(filename => {
  console.log(`Report for saved to: ${filename}`);
  disconnect();
});
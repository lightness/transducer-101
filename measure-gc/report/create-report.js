const fs = require('fs');
const { parse } = require('json2csv');
const { fetch, getLastMeasured, disconnect } = require('../persistance');

const getFileName = n => __dirname + `/out/report-${n}-${Date.now()}.csv`;

const process = gcOutput => gcOutput
  .match(/[^>] (\d+\.\d) \(/g)
  .map(x => x.split(' ')[1])
  .map(Number)
  .reduce((acc, cur) => acc > cur ? acc : cur);

async function createReport() {
  const N = await getLastMeasured();
  const data = [];

  for (let i = 1; i <= N; i++) {
    console.log(`Fetching data for: ${i}`);

    const [classic, transducer] = (await Promise.all([
      fetch(i, 'classic'),
      fetch(i, 'transducer'),
    ])).map(process);

    data.push({
      n: i, 
      classic,
      transducer,
    });
  }

  const csv = parse(data, { 
    fields: ['n', 'classic', 'transducer'],
    header: false,
  });
  const fileName = getFileName(N);

  fs.writeFileSync(fileName, csv);

  return fileName;
}

createReport().then(filename => {
  console.log(`Report for saved to: ${filename}`);
  disconnect();
});
const fs = require('fs');
const { parse } = require('json2csv');
const { getLastMeasured, fetch } = require("../persistance");

const getFileName = n => __dirname + `/out/report-${n}-${Date.now()}.csv`;

async function createReport() {
  const N = await getLastMeasured();
  const data = [];

  for (let i = 0; i <= N; i++) {
    console.log(`Fetching data for: ${i}`);

    const [classic, transducer] = await Promise.all([
      fetch('classic', i),
      fetch('transducer', i),
    ]);

    data.push({
      n: i, 
      classic,
      transducer,
      factor: transducer / classic
    });
  }

  const csv = parse(data, { 
    fields: ['n', 'classic', 'transducer', 'factor'],
    header: false,
  });
  const fileName = getFileName(N);

  fs.writeFileSync(fileName, csv);

  return fileName;
}

createReport().then(filename => {
  console.log(`Report for saved to: ${filename}`);
});

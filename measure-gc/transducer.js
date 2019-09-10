const transducer = require('../2-ways/transducer');
const { readFile } = require('./generate-data');

const N = Number(process.env.N);
const arr = readFile(N);

const result = transducer(arr);
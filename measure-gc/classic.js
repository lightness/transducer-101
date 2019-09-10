const classic = require('../2-ways/classic');
const { readFile } = require('./generate-data');

const N = Number(process.env.N);
const arr = readFile(N);

const result = classic(arr);
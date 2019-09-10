const fs = require('fs');
const { createArray } = require('../util');

const getFilePath = n => `${__dirname}/data/data-${n}.json`;

const generateFile = n => {
  fs.writeFileSync(getFilePath(n), JSON.stringify(createArray(n)));
};

const readFile = n => JSON.parse(fs.readFileSync(getFilePath(n), { encoding: 'utf8' }));

module.exports = {
  generateFile,
  readFile,
}
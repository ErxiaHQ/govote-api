const csvParser = require('csv-parse');
const fs = require('fs');

const tableName = 'states';
const states = [];
const filePath = './db/seeds/states.csv';

// ==============
// read and parse states csv
// ==============

function parseCSV(err, csvData) {
  if (err) console.log(err);
  csvParser(csvData, { delimiter: ',' }, readCSV);
}

function readCSV(err, data) {
  if (err) console.log(err);
  else {
    data.forEach(row => {
      if (row[0] !== '') {
        states.push({
          code: row[1],
          name: row[2]
        });
      }
    });
  }
}
// ==============

// ==============
// export seed function
// ==============
exports.seed = (knex, Promise) => {
  fs.readFile(filePath, { encoding: 'utf-8' }, parseCSV);
  return knex(tableName)
    .del()
    .then(() => knex(tableName).insert(states));
};

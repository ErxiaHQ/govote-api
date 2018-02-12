const csvParser = require('csv-parse');
const fs = require('fs');

const tableName = 'cities';
const cities = [];
const filePath = './db/seeds/cities.csv';

// ==============
// read and parse cities csv
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
        cities.push({
          state_id: row[1],
          name: row[2],
          code: row[3]
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
    .then(() => knex(tableName).insert(cities));
};

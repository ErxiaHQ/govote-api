const tableName = 'locations';
const csvParser = require('csv-parse');
const fs = require('fs');

const locations = [];
const filePath = './db/seeds/lagos-pvc-centres.csv';
fs.readFile(filePath, { encoding: 'utf-8' }, parseCSV);

function parseCSV(err, csvData) {
  if (err) console.log(err);
  csvParser(csvData, { delimiter: ',' }, readCSV);
}

function readCSV(err, data) {
  if (err) console.log(err);
  else {
    data.forEach(row => {
      if (row[0] !== '') {
        locations.push({
          area: row[0].trim(),
          name: row[1].trim(),
          address: row[2].trim(),
          state_id: 25
        });
      }
    });
  }
}

exports.seed = (knex, Promise) =>
  knex(tableName)
    .del()
    .then(() => knex(tableName).insert(locations));

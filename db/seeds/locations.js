const csvParser = require('csv-parse');
const fs = require('fs');
const db = require('../db');

const tableName = 'locations';
const locations = [];
const filePath = './db/seeds/lagos-pvc-centres.csv';

// ==============
// read and parse locations csv
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
// ==============

// ==============
// find cities for the locations
// ==============

async function findCity(a, b, c) {
  console.log(a, b, c);
  const [city] = await db('cities')
    .select('*')
    .where('name', 'like', `%${a}%`)
    .orWhere('name', 'like', `%${b}%`)
    .orWhere('name', 'like', `%${c}%`)
    .limit(1);
  return city;
}

async function processData(data) {
  const processed = [];
  for (const row of data) {
    const a = row['area'];
    const [b] = row['area'].split(' ');
    const [c] = row['area'].split('/');
    const city = await findCity(a, b, c);
    if (city) row['city_id'] = city.id;
    processed.push(row);
  }
  return processed;
}
// ==============

// ==============
// export seed function
// ==============
exports.seed = (knex, Promise) => {
  fs.readFile(filePath, { encoding: 'utf-8' }, parseCSV);
  return knex(tableName)
    .del()
    .then(() => processData(locations))
    .then(processedLocations => knex(tableName).insert(processedLocations));
};

const csvParser = require('csv-parse');
const fs = require('fs');
const request = require('request-promise');
const db = require('../db');

const tableName = 'locations';
const locations = [];
const filePath = './db/seeds/lagos-pvc-centres.csv';
const mapKey = process.env.GOOGLE_MAP_KEY;

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
// 1. find cities for the locations
// 2. geolocation processing (address, lat, lng)
// ==============

async function findCity(a, b, c) {
  const [city] = await db('cities')
    .select('id', 'name')
    .where('name', 'like', `%${a}%`)
    .orWhere('name', 'like', `%${b}%`)
    .orWhere('name', 'like', `%${c}%`)
    .limit(1);
  return city;
}

async function processCities(row) {
  const a = row['area'];
  const [b] = row['area'].split(' ');
  const [c] = row['area'].split('/');
  const city = await findCity(a, b, c);
  if (city) row['city_id'] = city.id;
  return row;
}

async function processGeo(row) {
  const address = `${row['name']}, ${row['area']}, Lagos, Nigeria`;
  try {
    let results = await request(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${mapKey}`
    );
    results = JSON.parse(results).results;
    if (results) {
      const [result] = results;
      if (result) {
        console.log(result.formatted_address);
        row.address = result.formatted_address;
        row.latitude = result.geometry.location.lat;
        row.longitude = result.geometry.location.lng;
      }
    }
  } catch (error) {
    console.log(error);
  }
  return row;
}

async function processData(data) {
  const processed = [];
  for (let row of data) {
    // @todo: find a way to fix multiple
    // awaits in loops :(
    row = await processCities(row);
    row = await processGeo(row);
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

const { parks, rides, stalls } = require('./data/index.js');
const format = require('pg-format')

const db = require('./connection');

function seed() {
  return db
    .query('DROP TABLE IF EXISTS rides;')
    .then(() => {
      return db.query('DROP TABLE IF EXISTS stalls;');
    })
    .then(() => {
      return db.query('DROP TABLE IF EXISTS foods;');
    })
    .then(() => {
      return db.query('DROP TABLE IF EXISTS stalls_foods;');
    })
    .then(() => {
      return db.query('DROP TABLE IF EXISTS parks;');
    })
    .then(() => {
      return createParks();
    })
    .then(() => {
      return createRides();
    })
    .then(() => {
      return insertParks();
    })
}

function createParks() {
  return db.query(
    `CREATE TABLE parks (
      park_id SERIAL PRIMARY KEY,
      park_name VARCHAR(40) NOT NULL,
      year_opened INT NOT NULL,
      annual_attendance INT NOT NULL
    );`);
}

function createRides() {
  return db.query(
    `CREATE TABLE rides (
      ride_id SERIAL PRIMARY KEY,
      park_id INT REFERENCES parks(park_id),
      ride_name VARCHAR(40) NOT NULL,
      year_opened DATE NOT NULL,
      votes INT DEFAULT 0
    );`);
}

function arrangeParksData(parksData) {
  const result = [];
  parksData.forEach((item) => {
    const itemArr = [];
    for (let key in item) {
      itemArr.push(item[key])
    }
    result.push(itemArr)
  })
  return result;
}

function insertParks() {
  const nestedArrOfValues = arrangeParksData(parks);
  const itemsInsertStr = format(
    `INSERT INTO parks
      (park_name, year_opened, annual_attendance)
    VALUES
      %L
    RETURNING *;`,
    nestedArrOfValues
    );
    return db.query(itemsInsertStr).then((result) => {
      console.log(result.rows)
    });
};

module.exports = { seed };

const { parks, rides, stalls } = require('./data/index.js');
const { arrangeParksData, arrangeRidesData, prepareRidesData } = require('../utils/index.js')
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
    .then((parks) => {
      const modifiedRides = prepareRidesData(rides, parks)
      return insertRides(modifiedRides);
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
      park_id INT REFERENCES parks(park_id) ON DELETE CASCADE,
      ride_name VARCHAR(40) NOT NULL,
      year_opened INT NOT NULL,
      votes INT DEFAULT 0
    );`);
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
      return result.rows
    });
  };

function insertRides(modifiedRides) {
  const nestedArrOfValues = arrangeRidesData(modifiedRides);
  const itemsInsertStr = format(
    `INSERT INTO rides
      (park_id, ride_name, year_opened, votes)
    VALUES
      %L
    RETURNING *;`,
    nestedArrOfValues
    );
    return db.query(itemsInsertStr).then((result) => {
      return result.rows
    });
}


module.exports = { seed, insertParks, insertRides };

const { parks, rides, stalls } = require('./data/index.js');

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
}

function createParks() {
  return db.query(
    `CREATE TABLE parks (
      park_id SERIAL PRIMARY KEY,
      park_name VARCHAR(40) NOT NULL,
      year_opened INT NOT NULL,
      annual_attendance INT NOT NULL
    )`);
}

function createRides() {
  return db.query(
    `CREATE TABLE rides (
      ride_id SERIAL PRIMARY KEY,
      park_id INT REFERENCES parks(park_id),
      ride_name VARCHAR(40) NOT NULL,
      year_opened DATE NOT NULL,
      votes INT DEFAULT 0
    )`);
}

module.exports = { seed };

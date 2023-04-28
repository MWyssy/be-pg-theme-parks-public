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
    });
}

function createParks() {
  /* Create your parks table in the query below */
  return db.query(
    `CREATE TABLE parks (
      park_id SERIAL PRIMARY KEY,
      park_name VARCHAR(40) NOT NULL,
      year_opened INT NOT NULL,
      annual_attendance INT NOT NULL
    )`);
}

module.exports = { seed };

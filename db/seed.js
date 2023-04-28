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
    .then((parks) => {
      const modifiedRides = modifyRidesData(rides, parks)
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
      park_id INT REFERENCES parks(park_id),
      ride_name VARCHAR(40) NOT NULL,
      year_opened INT NOT NULL,
      votes INT DEFAULT 0
    );`);
}


function arrangeParksData(parksData) {
  return parksData.map((park) => {
    return [park.park_name, park.year_opened, park.annual_attendance]
  });
};

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
  
function modifyRidesData(ridesData, dataFromParksTable) {
  const copyRidesData = [...ridesData];
  return copyRidesData.map((ride) => {
    const parkName = dataFromParksTable.find((park) => {
      return ride.park_name === park.park_name
    });
    ride.park_id = parkName.park_id;
    delete ride.park_name;
    return ride;
  });
};

function arrangeRidesData(ridesData) {
  return ridesData.map((ride) => {
    return [ride.park_id, ride.ride_name, ride.year_opened, ride.votes]
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


const db = require('../db/connection');

exports.selectParks = () => {
    return db.query('SELECT * FROM parks;')
        .then((parks) => {
            return parks.rows;
        });
};

exports.updateParkById = () => {};

exports.removeParkById = () => {};

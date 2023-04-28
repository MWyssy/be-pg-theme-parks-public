
const db = require('../db/connection');

exports.selectRidesByParkId = (id) => {
    return db.query(`
        SELECT * FROM rides
        JOIN parks ON parks.park_id = rides.park_id
        WHERE rides.park_id = ${id};
    `)
        .then((rides) => {
            console.log(rides.rows)
            return rides.rows;
        });
};

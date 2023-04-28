
const db = require('../db/connection');

exports.selectParks = () => {
    return db.query('SELECT * FROM parks;')
        .then((parks) => {
            return parks.rows;
        });
};

exports.updateParkById = (id, updates) => {
    return Promise.all(
        Object.entries(updates).map((update) => {
        return db.query(`
            UPDATE parks
            SET ${update[0]} = '${update[1]}'
            WHERE park_id = ${id};
        `)
        })
    )
    .then(() => {
        return db.query(`
            SELECT * FROM parks
            WHERE park_id = ${id}
        ;`);
    })
    .then((updatedParks) => {
        return updatedParks.rows[0];
    })
};

exports.removeParkById = () => {};

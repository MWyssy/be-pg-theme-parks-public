const { insertParks } = require('../db/seed')

exports.selectParks = (newPark) => {
    return insertParks(newPark);
};

exports.updateParkById = () => {};

exports.removeParkById = () => {};

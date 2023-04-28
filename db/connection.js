const { Pool } = require('pg');

if(!process.env.PGDATABASE) {
    throw new Error('PGDATABASE not set!');
};

const db = new Pool();

module.exports = db;
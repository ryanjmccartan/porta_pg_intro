const pg = require('pg');

const Pool = pg.Pool;
const pool = new Pool({
    database: 'music_library',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 3000
})

pool.on('connect', () => {
    console.log('Postgresql connected');
})

pool.on('error', (error) => {
    console.log('error with Postgres', error);
})

module.exports = pool;
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Beeblebr0x',
        database: 'employees'
    },
);

module.exports = db;
const db = require('../db/connection');
const cTable = require('console.table');

viewDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) throw (err);
        console.table(rows);
    })
};

module.exports = viewDepartments;
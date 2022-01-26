const db = require('../db/connection');

viewDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) throw (err);
        console.table(rows);
    })
};

module.exports = viewDepartments;
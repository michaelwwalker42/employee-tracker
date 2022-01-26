const db = require('../db/connection');

viewRoles = () => {
    const sql = `
    SELECT role.id,
    role.title AS job_title,
    role.salary,
    department.name AS department
    FROM role
    INNER JOIN department ON role.department_id = department.id;
    
    `;
    db.query(sql, (err, rows) => {
        if (err) throw (err);
        console.table(rows);
    })
};

module.exports = viewRoles;
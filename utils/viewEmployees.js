const db = require('../db/connection');
    // -------------- NEED TO ADD MANAGER STILL!!!------------------
viewEmployees = () => {
    const sql = `
    SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    department.name AS department,
    role.salary    
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id         
    `;
    db.query(sql, (err, rows) => {
        if (err) throw (err);
        console.table(rows);
    })
};

module.exports = viewEmployees;
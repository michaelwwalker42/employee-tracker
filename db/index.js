const db = require('./connection');
// this DB class contains the functions for the MySQL queries
class DB {
    constructor(db) {
        this.db = db
    }

    findDepartments() {
        return this.db.promise().query('SELECT * FROM department;')
    }

    findRoles() {
        return this.db.promise().query('SELECT role.id,role.job_title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id;')
    }

    findEmployees() {
        return this.db.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.job_title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager  FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;")
    }
    findManagers() {
        return this.db.promise().query("SELECT manager.id, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee INNER JOIN employee manager ON employee.manager_id = manager.id;")
    }

    createRole(role) {
        return this.db.promise().query("INSERT INTO role SET ?", role)
    }

    createDepartment(dept) {
        return this.db.promise().query("INSERT INTO department SET ?", dept)
    }

    createEmployee(emp) {
        return this.db.promise().query("INSERT INTO employee SET ?", emp)
    }
    updateRole(emp) {
        return this.db.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", emp)
    }
    changeManager(emp) {
        return this.db.promise().query("UPDATE employee SET manager_id = ? WHERE id = ?", emp)
    }
    empsByDepts() {
        return this.db.promise().query("SELECT department.name AS Department, CONCAT(employee.first_name, ' ', employee.last_name) AS Name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY department.name ASC;")
    }
    empsByMgr() {
        return this.db.promise().query("SELECT CONCAT(manager.first_name, ' ', manager.last_name) As Manager, CONCAT(employee.first_name, ' ', employee.last_name) AS Employee FROM employee INNER JOIN employee manager ON employee.manager_id = manager.id ORDER By manager.last_name ASC;")
    }
    deleteDepts(dept) {
        return this.db.promise().query("DELETE FROM department WHERE  department.id = ?", dept)
    }
    deleteRoles(role){
        return this.db.promise().query("DELETE FROM role WHERE role.id = ?", role)
    }
};

module.exports = new DB(db)


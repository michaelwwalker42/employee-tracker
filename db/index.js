const db = require('./connection');

class DB{
    constructor(db){
        this.db = db
    }

    findDepartments(){
        return this.db.promise().query('SELECT * FROM department;')
    }

    findRoles(){
        return this.db.promise().query('SELECT role.id,role.title AS job_title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id;') 
    }

    findEmployees(){
        return this.db.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager  FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;") 
    }

    createRole(role){
        return this.db.promise().query("INSERT INTO role SET ?", role)
    }

};

module.exports = new DB(db)
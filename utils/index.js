const viewDepartments = require('./viewDepartments');
const viewRoles = require('./viewRoles');
const viewEmployees = require('./viewEmployees');
const addDepartment = require('./addDepartment'); 
const addEmployee = require('./addEmployee');
const addRole = require('./addRole');
const updateEmployee = require('./updateEmployee');

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addEmployee,
    addRole,
    updateEmployee
}
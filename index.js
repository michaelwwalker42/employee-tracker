const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');
const viewDepartments = require('./utils/viewDepartments');


db.connect(err => {
    if (err) throw err;
    console.log('Connected to employee database.');
    init();
});

const mainOptions = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role']
    }
]



const init = () => {
    console.log(`
    ______________________________________
   |                                      |
   |          EMPLOYEE MANAGER            |
   |______________________________________|
 `)
    return inquirer.prompt(mainOptions)
        .then(function (response) {
            let choice = response.options;
            switch (choice) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployee();
                    break;
            }
        });
};


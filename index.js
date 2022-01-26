const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

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
        if (choice === 'View all departments') {
            allDepartments();            
        }
        if (choice === 'View all roles') {
            allRoles();            
        }
        if (choice === 'View all employees') {
            allEmployees();            
        }
        if (choice === 'Add a department') {
            addDepartment();            
        }
        if (choice === 'Add a role') {
            addRole();            
        }
        if (choice === 'Add an employee') {
            addEmployee();            
        }
        if (choice === 'Update an employee role') {
            updateRole();
        }                     
    })
};


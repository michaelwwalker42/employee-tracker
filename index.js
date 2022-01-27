const inquirer = require('inquirer');
require('console.table');
const db = require('./db');

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
            'Update an employee role',
            'Quit']
    }
]

init()

function init() {
    console.log(`
    ______________________________________
   |                                      |
   |          EMPLOYEE MANAGER            |
   |______________________________________|
 `)
    prompts()
};

function prompts() {
    inquirer.prompt(mainOptions)
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
                default:
                    process.exit()
            }
        });
};


function viewDepartments() {
    db.findDepartments().then(([depts]) => {
        console.table(depts)
    }).then(() => prompts())
};

function viewRoles() {
    db.findRoles().then(([roles]) => {
        console.table(roles)
    }).then(() => prompts())
};

function viewEmployees() {
    db.findEmployees().then(([Emps]) => {
        console.table(Emps)
    }).then(() => prompts())
};

function addRole() {
    // first find departments and map each into an object with id and name
    db.findDepartments().then(([depts]) => {
        const departments = depts.map(({ id, name }) => ({
            name: name,
            value: id
        }));

        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the name of the role?'
            },
            {
                type: 'list',
                // use the mapped departments
                choices: departments,
                name: 'department_id',
                message: 'What department does this role belong to?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of this role?'
            }
        ]).then((answers) => {
            db.createRole(answers).then(() => prompts())
        })
    })
};
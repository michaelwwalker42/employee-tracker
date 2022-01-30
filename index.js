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
            'View employees by department',
            'View employees by manager',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Update an employee manager',
            'Remove a department',
            'Remove a role',
            'Remove an employee',
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
                case 'Update an employee manager':
                    updateManager();
                    break;
                case 'View employees by department':
                    viewByDepartment();
                    break;
                case 'View employees by manager':
                    viewByManager();
                    break;
                case 'Remove a department':
                    deleteDepts();
                    break;
                case 'Remove a role':
                    deleteRoles();
                    break;
                case 'Remove an employee':
                    deleteEmployee();
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

function viewByDepartment() {
    db.empsByDepts().then(([emps]) => {
        console.table(emps)
    }).then(() => prompts())
};

function viewByManager() {
    db.empsByMgr().then(([emps]) => {
        console.table(emps)
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
                name: 'job_title',
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

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?'
        }
    ]).then((answers) => {
        db.createDepartment(answers).then(() => prompts())
    })

};

function addEmployee() {
    db.findRoles().then(([rolesArray]) => {
        // use map to get id and job_title from role table
        const roles = rolesArray.map(({ id, job_title }) => ({
            name: job_title,
            value: id
        }))
        // find managers then use map to get manager names and id's
        db.findManagers().then(([managersArray]) => {
            const managers = managersArray.map(({ id, manager }) => ({
                name: manager,
                value: id
            }))

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the first name of the employee?'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is the last name of the employee?'
                },
                {
                    type: 'list',
                    // use the mapped roles from roles array
                    choices: roles,
                    name: 'role_id',
                    message: 'What is the role of the employee?'
                },
                {
                    type: 'list',
                    // use the mapped managers from managers array
                    choices: managers,
                    name: 'manager_id',
                    message: 'Who is the manager of the employee?'
                }
            ]).then((employee) => {
                db.createEmployee(employee).then(() => prompts());
            })
        })
    })
};

function updateEmployee() {

    db.findEmployees().then(([empArray]) => {
        const employees = empArray.map(({ id, first_name, last_name }) => ({
            name: first_name + " " + last_name,
            value: id
        }))
        inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: 'Which employee would you like to update?',
                choices: employees
            }
        ]).then(choice => {
            const empId = choice.id;
            const roleInfo = [];
            roleInfo.push(empId);
            db.findRoles().then(([rolesArray]) => {
                // use map to get id and job_title from role table
                const roles = rolesArray.map(({ id, job_title }) => ({
                    name: job_title,
                    value: id
                }));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the new role of the employee?',
                        choices: roles
                    }
                ])
                    .then(choice => {
                        roleInfo.push(choice.role);
                        // reverse the role info so the role id is first in the array when it passes to db.updateRole
                        roleInfo.reverse();
                        db.updateRole(roleInfo).then(() => prompts());
                    })
            })
        })
    })
};

function updateManager() {

    db.findEmployees().then(([empArray]) => {
        const employees = empArray.map(({ id, first_name, last_name }) => ({
            name: first_name + " " + last_name,
            value: id
        }))
        inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: "Which employee would you like to update?",
                choices: employees
            },
            {
                type: 'list',
                choices: employees,
                name: 'manager_id',
                message: 'Who is the new manager of the employee?'
            }
        ]).then(answers => {
            const empId = answers.id;
            const newMgrId = answers.manager_id;
            const mgrInfo = [];
            mgrInfo.push(newMgrId)
            mgrInfo.push(empId);
            // console.log(mgrInfo)
            db.changeManager(mgrInfo).then(() => prompts())
        })
    })
};

function deleteDepts() {
    db.findDepartments().then(([deptsArray]) => {
        // get department name and id to show in inquirer prompt
        const depts = deptsArray.map(({ id, name }) => ({
            name: name,
            value: id
        }))
        inquirer.prompt([
            {
                type: 'list',
                name: 'department_id',
                message: 'Which department do you want to remove?',
                choices: depts
            }
        ]).then(answer => {
            const department = answer.department_id;
            db.deleteDepts(department).then(() => prompts())
        })
    })
};

function deleteRoles() {
    db.findRoles().then(([rolesArray]) => {
        // get job title and id to use in prompts
        const roles = rolesArray.map(({ id, job_title }) => ({
            name: job_title,
            value: id
        }))
        inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: 'Which role do you want to remove?',
                choices: roles
            }
        ]).then(answer => {
            const role = answer.id;
            db.deleteRoles(role).then(() => viewRoles())
        })
    })
};

function deleteEmployee() {

    db.findEmployees().then(([empArray]) => {
        const employees = empArray.map(({ id, first_name, last_name }) => ({
            name: first_name + " " + last_name,
            value: id
        }))
        inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: "Which employee would you like to remove?",
                choices: employees
            }
        ]).then(answer => {
            const employee = answer.id;
            db.deleteEmployees(employee).then(() => viewEmployees())
        })
    })
};










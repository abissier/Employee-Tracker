const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Riley@2",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
    promptUser();
});

function promptUser() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add a new department",
                "Add a new role",
                "Add a new employee",
                "View all departments",
                "View all roles",
                "View all employees",
                "Update employee roles"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Add a new department":
                    addNewDepartment();
                    break;

                case "Add a new role":
                    addNewRole();
                    break;

                case "Add a new employee":
                    addNewEmployee();
                    break;

                case "View all departments":
                    viewAllDepartments();
                    break;

                case "View all roles":
                    viewAllRoles();
                    break;

                case "View all employees":
                    viewAllEmployees();
                    break;

                case "Update employee roles":
                    updateRoles();
                    break;
            }
        });
}

//-------------------Add functions-------------------------
//---add new department----
function addNewDepartment() {
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "What department would you like to add?"
            },
            {
                name: "id",
                type: "input",
                message: "What is the id number for the new department?"
            }
        ]).then(function (answer) {
            var query = "INSERT INTO departments SET ?";
            connection.query(query, { department_id: answer.id, name: answer.department }, function (err, res) {
                console.log("\n");
                console.table(`${answer.department} succesfully added to the departments table`)
            });
            promptUser();
        });
};
//----add new role----
function addNewRole() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Please enter the role ID"
            },
            {
                name: "title",
                type: "input",
                message: "Please enter the role title"
            },
            {
                name: "salary",
                type: "input",
                message: "Please enter the role salary"
            },
            {
                name: "department_id",
                type: "input",
                message: "Please enter the department ID number"
            }
        ]).then(function (answer) {
            connection.query("INSERT INTO roles SET ?",
                {
                    role_id: answer.id,
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id
                }, function (err, res) {
                    console.log("\n");
                    console.table(`The ${answer.title} role was succesfully added to the roles table`)
                });
            promptUser();
        });
};
//---add new employee----
function addNewEmployee() {
    connection.query("SELECT * FROM employees INNER JOIN roles ON employees.role_id=roles.role_id", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "employeeId",
                    type: "input",
                    message: "Please enter the employee ID number",
                },
                {
                    name: "firstName",
                    type: "input",
                    message: "Please enter the employee's first name"
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "Please enter the employee's last name"
                },
                {
                    name: "roleId",
                    type: "list",
                    message: "Please select the role ID number",
                    choices: function () {
                        const roleArray = [];

                        for (var i = 0; i < res.length; i++) {
                            roleArray.push(res[i].role_id);
                        }

                        return roleArray;
                    },
                },
                {
                    name: "managerId",
                    type: "input",
                    message: "Please enter the manager ID number",
                }
            ]).then(function (answer) {
                connection.query("INSERT INTO employees SET ?",

                    {
                        employee_id: answer.employeeId,
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: answer.roleId,
                        manager_id: answer.managerId
                    },
                    function (err, res) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(`${answer.firstName} ${answer.lastName} was succesfully added to the employees table`);
                        };
                    });
                promptUser();
            });
    });
}

//------------------View functions-----------------------------
function viewAllDepartments() {
    var query = "SELECT * FROM departments";
    connection.query(query, function (err, res) {
        console.log("\n");
        console.table(res);
    });
    promptUser();
}

function viewAllRoles() {
    var query = "SELECT * FROM roles";
    connection.query(query, function (err, res) {
        console.log("\n");
        console.table(res)
    });
    promptUser();
};

function viewAllEmployees() {
    var query = "SELECT  CONCAT(employees.first_name,' ', employees.last_name) AS employee_name, roles.title AS job_title, ";
    query += "roles.salary, departments.name AS department FROM Employees INNER JOIN Roles ON ";
    query += "employees.role_id=roles.role_id INNER JOIN Departments ON roles.department_id = departments.department_id";
    connection.query(query, function (err, res) {
        console.log("\n");
        console.table(res)
    });
    promptUser();
};

//----------------Update functions----------------------------
function updateRoles() {
    connection.query("SELECT last_name FROM employees", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "lastname",
                type: "list",
                message: "Please select the employee's last name for which you would like to change roles",
                choices: function () {
                    const lastName = [];

                    for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }

                    return lastName;
                },
            }
            ]).then(function (answer) {
                console.log(answer)
            });
    });
    promptUser();
}
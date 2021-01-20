const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
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
            type: "rawlist",
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
        }).then(function (answer) {
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
//Add functions

//View functions
function viewAllDepartments() {
    var query = "SELECT * FROM departments";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].name);
        }
        promptUser();
    });
}
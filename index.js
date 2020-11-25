const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "camcam24",
  database: "employees_DB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  addRole();
});

function viewAllEmployees() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, department.department, role.title, role.salary FROM employee RIGHT JOIN department ON employee.role_id = department.id RIGHT JOIN role ON role.department_id = employee.role_id",
    (err, response) => {
      if (err) throw err;
      console.table(response);
    }
  );
}

function addEmployee(){

    inquirer.prompt([
        {
            type: "input",
            message: "Whats the employees first name?",
            name: "firstName"
        },
        {
            type: "input",
            message: "Whats the employees last name?",
            name: "lastName"
        },
        {
            type: "type",
            message: "Whats the employees role?",
            name: "role"        },
        {
            type: "input",
            message: "Who's the employees manager?",
            name: "manager"
        }
    ]).then(({firstName, lastName, role, manager})=>{
        console.log(firstName, lastName, role, manager)

        connection.query("INSERT INTO employee(first_name, last_name, role_id, manager_id)VALUES(?, ?, ?, ?)", [firstName,lastName,role,manager], (err, result)=>{
            if (err) throw err;
            console.table(result)
        })
    })
}

function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            message: "What Department would you like to add?",
            name: "department"
        }
    ]).then(({department})=>{
        console.log(department);

        connection.query("INSERT INTO department (department) VALUES (?)", [department],(err, result)=>{
            if (err) throw err;
            console.table(result)
        })
    })
}

function addRole(){
    inquirer.prompt([
        {
            type: "input",
            message: "What Role would you like to add?",
            name: "role"
        },
        {
            type: "input",
            message: "What's the salary for this role?",
            name: "salary"
        },
        {
            type: "input",
            message: "What's this roles department ID?",
            name: "departmentID"
        }
    ]).then(({role, salary, departmentID})=>{
        console.log(role,salary,departmentID);

        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", [role,salary,departmentID],(err, result)=>{
            if (err) throw err;
            console.table(result)
        })
    })
}
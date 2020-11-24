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
  addDepartment();
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
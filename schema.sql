DROP DATABASE IF EXISTS employees_DB;

CREATE DATABASE employees_DB;

USE employees_DB;

CREATE TABLE employee(
	id INTEGER AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY (id)
);

CREATE TABLE role(
	id INTEGER AUTO_INCREMENT,
    title VARCHAR(30),
    salary INT,
    department_id INTEGER,
    PRIMARY KEY (id)
);

CREATE TABLE department(
	id INTEGER AUTO_INCREMENT,
    department VARCHAR (30),
    PRIMARY KEY (id)
);

INSERT INTO employee(first_name, last_name, role_id, manager_id)VALUES("Damian" , "Campbell" , 1 , 1), ("Maddie" , "Timothee" , 2 , 1),("Dorothea", "Campbell", 3, 1) ;

SELECT * FROM employee;

INSERT INTO role(title, salary, department_id)VALUES("Software Engineer", 90000, 1), ("Senior Product Marketer", 85000, 2),("Manager", 100000, 3);

SELECT * FROM role;

INSERT INTO department(department)VALUES("Engineering"),("Marketing"),("Sales"),("Support");

SELECT * FROM department;

SELECT employee.first_name, employee.last_name, department.department, role.title, role.salary FROM employee
RIGHT JOIN department
ON employee.role_id = department.id
RIGHT JOIN role
ON role.department_id = employee.role_id;

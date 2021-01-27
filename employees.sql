DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (   
    department_id INT NOT NULL, 
    name VARCHAR(30) NULL,
    PRIMARY KEY(department_id)
);

CREATE TABLE roles ( 
    role_id INT NOT NULL,
    title VARCHAR(30) NULL, 
    salary DECIMAL NULL,
    department_id INT NULL,
    PRIMARY KEY(role_id)
);

CREATE TABLE  employees (  
    employee_id INT NOT NULL,
    first_name VARCHAR(30) NULL, 
    last_name VARCHAR(30) NULL,
    role_id INT NULL,
    manager_id INT NULL, 
    PRIMARY KEY(employee_id)
);

INSERT INTO departments (department_id, name)
VALUES 
    (101, "HR"),
    (102, "Finance"),
    (103, "Marketing"),
    (104, "IT");

INSERT INTO roles (role_id, title, salary, department_id)
VALUES 
    (10100, "Human Resources Specialist", 58350.00, 101),
    (10200, "CFO", 180000.00, 102),
    (10300, "Copywriter", 45000.00, 103),
    (10400, "System Administrator", 85000.00, 104);

INSERT INTO employees (employee_id, first_name, last_name, role_id, manager_id)
VALUES 
    (011, "Melissa", "Melba", 10100, null),
    (201, "Darrin", "Abbot", 10200, null),
    (301, "Wilburt", "Silva", 10300, 011),
    (401, "Dafina", "Kurti", 10400, null);



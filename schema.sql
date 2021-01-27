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

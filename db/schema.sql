-- create the database
DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;

-- create department table
CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(30) NOT NULL
);

-- create role table
CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER,
    FOREIGN KEY(department_id)
    REFERENCES department(id)
);


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
    FOREIGN KEY (department_id)
    REFERENCES department(id) ON DELETE SET NULL
);

-- create employee table
CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    FOREIGN KEY (role_id)
    REFERENCES role(id) ON DELETE SET NULL,
    manager_id INTEGER,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id) ON DELETE SET NULL
);


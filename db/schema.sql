-- create the database
DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;

-- create department table
CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(30)
);


INSERT INTO department
(name)
VALUES
('Engineering'),
('Sales'),
('Finance'),
('Legal');

INSERT INTO role
(title, salary, department_id)
VALUES
('Salesperson', 80000, 2),
('Lead Engineer', 150000, 1),
('Accountant', 125000, 3),
('Lawyer', 150000, 4),
('Software Engineer', 120000, 1),
('Account Manager', 160000, 3),
('Legal Team Lead', 250000, 4);

INSERT INTO employee
(first_name,last_name,role_id)
VALUES
('Mike', 'Chan', 1),
('Ashley', 'Rodriguez', 2),
('Kevin', 'Tupik', 5),
('Kunal', 'Singh', 6),
('Malia', 'Brown', 3),
('Sarah', 'Lourd', 7),
('Tom', 'Allen', 4);



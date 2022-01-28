INSERT INTO department
(name)
VALUES
('Engineering'),
('Sales'),
('Finance'),
('Legal');

INSERT INTO role
(job_title, salary, department_id)
VALUES
('Salesperson', 80000, 2),
('Lead Engineer', 150000, 1),
('Accountant', 125000, 3),
('Lawyer', 150000, 4),
('Software Engineer', 120000, 1),
('Account Manager', 160000, 3),
('Legal Team Lead', 250000, 4),
('Sales Team Lead', 120000, 2);

INSERT INTO employee
(first_name,last_name,role_id, manager_id)
VALUES
('Ashley', 'Rodriguez', 2, null),
('Kevin', 'Tupik', 5, 1),
('Kunal', 'Singh', 6, null),
('Malia', 'Brown', 3, 3),
('Sarah', 'Lourd', 7, null),
('Tom', 'Allen', 4, 5),
('Tim', 'Allen', 8, null),
('Mike', 'Chan', 1, 7);


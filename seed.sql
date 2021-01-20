
INSERT INTO departments (id, name)
VALUES 
    (101, "HR"),
    (102, "Finance"),
    (103, "Marketing"),
    (104, "IT");

INSERT INTO roles (id, title, salary, department_id)
VALUES 
    (10100, "Human Resources Specialist", 58350.00, 101),
    (10200, "CFO", 180000.00, 102),
    (10300, "Copywriter", 45000.00, 103),
    (10400, "System Administrator", 85000.00, 104);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES 
    (105, "Melissa", "Melba", 10100, 1),
    (202, "Darrin", "Abbot", 10200, 2),
    (398, "Wilburt", "Silva", 10300, 3),
    (437, "Dafina", "Kurti", 10400, 4);
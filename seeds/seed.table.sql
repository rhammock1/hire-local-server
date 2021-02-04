BEGIN;

TRUNCATE
    "reqs",
    "jobs",
    "user";

INSERT INTO "user" ("username", "name", "password")
VALUES
  (
    'admin',
    'Hire Local Admin',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );


INSERT INTO "jobs" ("user_id", "description", "salary", "exp_level", "job_type", "contact")
VALUES
    (1, 'This is a test job desription', 85000, 'mid', 'part-time', 'hireLocalTest@gmail.com'),
    (1, 'This is a test job desription', 200000, 'senior', 'full-time', 'hireLocalTest@gmail.com'),
    (1, 'This is a test job desription', 45000, 'entry', 'full-time', 'hireLocalTest@gmail.com'),
    (1, 'This is a test job desription', 120000, 'mid', 'contract', 'hireLocalTest@gmail.com'),
    (1, 'This is a test job desription', 68000, 'entry', 'internship', 'hireLocalTest@gmail.com'),
    (1, 'This is a test job desription', 100000, 'mid', 'temporary', 'hireLocalTest@gmail.com'),
    (1, 'This is a test job desription', 150000, 'senior', 'full-time', 'hireLocalTest@gmail.com');

INSERT INTO "reqs" ("job_id", "requirement")
VALUES
    (1, '2 years with Node.js'),
    (1, '2 years with Express.js'),
    (1, '2 years with React'),
    (1, '2 years with Cloud Services'),
    (1, '2 years with HTML and CSS'),
    (2, '2 years with Node.js'),
    (2, '2 years with Express.js'),
    (2, '2 years with React'),
    (2, '2 years with Cloud Services'),
    (2, '2 years with HTML and CSS'),
    (3, '2 years with Node.js'),
    (3, '2 years with Express.js'),
    (3, '2 years with React'),
    (3, '2 years with Cloud Services'),
    (3, '2 years with HTML and CSS'),
    (4, '2 years with Node.js'),
    (4, '2 years with Express.js'),
    (4, '2 years with React'),
    (4, '2 years with Cloud Services'),
    (4, '2 years with HTML and CSS'),
    (5, '2 years with Node.js'),
    (5, '2 years with Express.js'),
    (5, '2 years with React'),
    (5, '2 years with Cloud Services'),
    (5, '2 years with HTML and CSS'),
    (6, '2 years with Node.js'),
    (6, '2 years with Express.js'),
    (6, '2 years with React'),
    (6, '2 years with Cloud Services'),
    (6, '2 years with HTML and CSS'),
    (7, '2 years with Node.js'),
    (7, '2 years with Express.js'),
    (7, '2 years with React'),
    (7, '2 years with Cloud Services'),
    (7, '2 years with HTML and CSS');

COMMIT;
BEGIN;

TRUNCATE
    "user_resume",
    "user_applied",
    "user_saves",
    "reqs",
    "jobs",
    "user"
    RESTART IDENTITY CASCADE;

INSERT INTO "user" ("username", "name", "password")
VALUES
  (
    'admin',
    'Hire Local Admin',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );


INSERT INTO "jobs" ("user_id", "title", "location", "zipcode", "company", "summary", "description", "salary", "exp_level", "job_type", "contact")
VALUES
    (1, 'Software Engineer', 'Denver, CO', 80014, 'Small Company inc.', 'Small Tech company seeking Mid Level engineer to focus on software systems programming.', 'We are looking for a passionate Software Engineer to design, develop and install software solutions. Software Engineer responsibilities include gathering user requirements, defining system functionality and writing code in various languages, like Java, Ruby on Rails or .NET programming languages (e.g. C++ or JScript.NET.) Our ideal candidates are familiar with the software development life cycle (SDLC) from preliminary system analysis to tests and deployment. Ultimately, the role of the Software Engineer is to build high-quality, innovative and fully performing software that complies with coding standards and technical design. Responsibilites include writing well-designed and testable code, troubleshoot, debug, and upgrade existing systems.', 85000, 'mid', 'contract', 'hirelocal01@gmail.com'),
    (1, 'Front End Developer', 'Denver, CO', 80014, 'Small Company inc.', 'Small Tech company seeking Senior Level developer to focus on designing responsive E-Commerce websites.', 'We are looking for a Front-End Web Developer who is motivated to combine the art of design with the art of programming. Responsibilities will include translation of the UI/UX design wireframes to actual code that will produce visual elements of the application. You will work with the UI/UX designer and bridge the gap between graphical design and technical implementation, taking an active role on both sides and defining how the application looks as well as how it works. Responsibilites include writing well-designed and testable code, troubleshoot, debug, and upgrade existing systems.', 200000, 'senior', 'full-time', 'hirelocal01@gmail.com'),
    (1, 'Line Cook', 'Charlotte, NC', 28215, 'Bear Market and Grill', 'Local market and grill restaurant seeking Entry Level line cook to assist with food prep and production.', 'We are looking for a professional Line Cook to prepare food to the exact chef’s specifications and to set up stations for menu. Line Cook duties will consist of assisting the executive and sous chef with their daily tasks. The successful candidate will play a key role in contributing to our customer satisfaction and acquisition goals. Responsibilites include setting up and stocking stations as neccessary and preparing food for service.', 45000, 'entry', 'part-time', 'hirelocal01@gmail.com'),
    (1, 'Head Chef', 'Charlotte, NC', 33556, 'Spoon & Fork', 'High-End restaruant seeking Head Chef to create and implement new menu items.', 'We are looking for an experienced and qualified Head Chef to organize the kitchen’s activities. You will be the first in command in the facilities and will create and inspect dishes before they arrive at the customers ensuring high quality and contentment. Responsibilities include oversite of the kitchen and food preparation as well as constructing a seasonal and sustainable menu', 120000, 'senior', 'full-time', 'hirelocal01@gmail.com'),
    (1, 'Farm Hand', 'Keystone, FL', 33556, 'The Local Farm', 'The Local Farm is seeking a inter farm hand to assist with harvest and preparation of produce', 'Farm hands make sure that the day to day running of a farm goes as smoothly as possible. They help the farmer manage the different areas of the farm and are responsible for performing numerous tasks throughout a typical working day. They work closely with animals of all kinds and operate heavy farming machinery.', 68000, 'entry', 'internship', 'hirelocal01@gmail.com'),
    (1, 'Farm Lead', 'Keystone, FL', 80014, 'The Local Farm', 'The Local Farm is seeking a temporary Farm Lead to oversee farm hands and harvest.', 'Farm Leads make sure that the day to day running of a farm goes as smoothly as possible. They help the farmer manage the different areas of the farm and are responsible for performing numerous tasks throughout a typical working day. They work closely with animals of all kinds and operate heavy farming machinery. Responsibilites include oversite of farm hands and harvest.', 100000, 'mid', 'temporary', 'hirelocal01@gmail.com'),
    (1, 'Back End Engineer', 'Denver, CO', 80014, 'Small Company inc.', 'Small Tech company seeking Senior Level engineer to focus on designing responsive E-Commerce websites', 'We are looking for a Back-End Web Developer responsible for managing the interchange of data between the server and the users. Your primary focus will be development of all server-side logic, definition and maintenance of the central database, and ensuring high performance and responsiveness to requests from the front-end. You will also be responsible for integrating the front-end elements built by your coworkers into the application. A basic understanding of front-end technologies is therefore necessary as well.', 150000, 'senior', 'full-time', 'hirelocal01@gmail.com');

INSERT INTO "reqs" ("job_id", "requirement")
VALUES
    (1, 'Proficiency with Node.js or another modern language'),
    (1, 'Proficiency with Cloud Services'),
    (1, 'Proficiency with Git and VSCode'),
    (1, 'Teamwork'),
    (1, 'Problem solving'),
    (2, 'Comfortable with React, Angular, or Vue'),
    (2, 'Teamwork'),
    (2, 'Problem solving'),
    (2, 'Strong interpersonal skills'),
    (2, 'Strong understanding of key design principles'),
    (3, 'Teamwork'),
    (3, 'Good communication skills'),
    (3, 'Problem solving'),
    (4, 'Ability to lead a team'),
    (4, 'Excellent verbal and written communication'),
    (4, 'Great cooking skills and attention to detail'),
    (4, 'Ability to manage kitchen budget and stay organized'),
    (5, 'Teamwork'),
    (5, 'Good communication skills'),
    (5, 'Problem solving'),
    (6, 'Teamwork'),
    (6, 'Good communication skills'),
    (6, 'Problem solving'),
    (6, 'Ability to lead a team'),
    (7, 'Basic understanding of front-end technology such as Java, HTML5 and CSS3'),
    (7, 'Very comfortable with a modern server side language such as Python, Ruby, Java, or Node.js'),
    (7, 'Teamwork'),
    (7, 'Good communication skills'),
    (7, 'Problem solving'),
    (7, 'Ability to lead a team');

COMMIT;
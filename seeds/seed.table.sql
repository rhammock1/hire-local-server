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
    (1, 'Test Title', 'Denver, CO', 80014, 'Test Company inc.', 'This is a test job summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam posuere odio quis tellus rhoncus, dictum congue nisl rhoncus. Praesent et urna purus. Nunc rhoncus, augue in viverra interdum, libero orci porttitor sem, ut viverra ligula nisi quis velit. Curabitur pulvinar sagittis lacus, vel molestie dui. Morbi magna velit, tincidunt at varius a, eleifend a odio. Vestibulum orci ligula, varius nec venenatis id, pretium viverra elit. Mauris est justo, sodales quis posuere nec, rhoncus eget ex. Vestibulum eleifend dolor posuere elementum vulputate. Integer ut mauris eu metus sagittis scelerisque. In sed ligula nulla. Mauris turpis mi, dapibus eget leo sed, tincidunt finibus nisl. Aliquam dapibus risus velit, interdum hendrerit ipsum dignissim quis. In sed lacinia ligula. Vivamus in mauris fermentum, hendrerit turpis id, ultrices mi. Donec rhoncus ipsum ut ligula suscipit, a semper diam egestas. Sed a feugiat ex.', 85000, 'mid', 'part-time', 'hirelocal01@gmail.com'),
    (1, 'Test Title', 'Denver, CO', 80014, 'Test Company inc.', 'This is a test job summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam posuere odio quis tellus rhoncus, dictum congue nisl rhoncus. Praesent et urna purus. Nunc rhoncus, augue in viverra interdum, libero orci porttitor sem, ut viverra ligula nisi quis velit. Curabitur pulvinar sagittis lacus, vel molestie dui. Morbi magna velit, tincidunt at varius a, eleifend a odio. Vestibulum orci ligula, varius nec venenatis id, pretium viverra elit. Mauris est justo, sodales quis posuere nec, rhoncus eget ex. Vestibulum eleifend dolor posuere elementum vulputate. Integer ut mauris eu metus sagittis scelerisque. In sed ligula nulla. Mauris turpis mi, dapibus eget leo sed, tincidunt finibus nisl. Aliquam dapibus risus velit, interdum hendrerit ipsum dignissim quis. In sed lacinia ligula. Vivamus in mauris fermentum, hendrerit turpis id, ultrices mi. Donec rhoncus ipsum ut ligula suscipit, a semper diam egestas. Sed a feugiat ex.', 200000, 'senior', 'full-time', 'hirelocal01@gmail.com'),
    (1, 'Test Title', 'Denver, CO', 80014, 'Test Company inc.', 'This is a test job summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam posuere odio quis tellus rhoncus, dictum congue nisl rhoncus. Praesent et urna purus. Nunc rhoncus, augue in viverra interdum, libero orci porttitor sem, ut viverra ligula nisi quis velit. Curabitur pulvinar sagittis lacus, vel molestie dui. Morbi magna velit, tincidunt at varius a, eleifend a odio. Vestibulum orci ligula, varius nec venenatis id, pretium viverra elit. Mauris est justo, sodales quis posuere nec, rhoncus eget ex. Vestibulum eleifend dolor posuere elementum vulputate. Integer ut mauris eu metus sagittis scelerisque. In sed ligula nulla. Mauris turpis mi, dapibus eget leo sed, tincidunt finibus nisl. Aliquam dapibus risus velit, interdum hendrerit ipsum dignissim quis. In sed lacinia ligula. Vivamus in mauris fermentum, hendrerit turpis id, ultrices mi. Donec rhoncus ipsum ut ligula suscipit, a semper diam egestas. Sed a feugiat ex.', 45000, 'entry', 'full-time', 'hirelocal01@gmail.com'),
    (1, 'Test Title', 'Denver, CO', 80014, 'Test Company inc.', 'This is a test job summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam posuere odio quis tellus rhoncus, dictum congue nisl rhoncus. Praesent et urna purus. Nunc rhoncus, augue in viverra interdum, libero orci porttitor sem, ut viverra ligula nisi quis velit. Curabitur pulvinar sagittis lacus, vel molestie dui. Morbi magna velit, tincidunt at varius a, eleifend a odio. Vestibulum orci ligula, varius nec venenatis id, pretium viverra elit. Mauris est justo, sodales quis posuere nec, rhoncus eget ex. Vestibulum eleifend dolor posuere elementum vulputate. Integer ut mauris eu metus sagittis scelerisque. In sed ligula nulla. Mauris turpis mi, dapibus eget leo sed, tincidunt finibus nisl. Aliquam dapibus risus velit, interdum hendrerit ipsum dignissim quis. In sed lacinia ligula. Vivamus in mauris fermentum, hendrerit turpis id, ultrices mi. Donec rhoncus ipsum ut ligula suscipit, a semper diam egestas. Sed a feugiat ex.', 120000, 'mid', 'contract', 'hirelocal01@gmail.com'),
    (1, 'Test Title', 'Denver, CO', 80014, 'Test Company inc.', 'This is a test job summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam posuere odio quis tellus rhoncus, dictum congue nisl rhoncus. Praesent et urna purus. Nunc rhoncus, augue in viverra interdum, libero orci porttitor sem, ut viverra ligula nisi quis velit. Curabitur pulvinar sagittis lacus, vel molestie dui. Morbi magna velit, tincidunt at varius a, eleifend a odio. Vestibulum orci ligula, varius nec venenatis id, pretium viverra elit. Mauris est justo, sodales quis posuere nec, rhoncus eget ex. Vestibulum eleifend dolor posuere elementum vulputate. Integer ut mauris eu metus sagittis scelerisque. In sed ligula nulla. Mauris turpis mi, dapibus eget leo sed, tincidunt finibus nisl. Aliquam dapibus risus velit, interdum hendrerit ipsum dignissim quis. In sed lacinia ligula. Vivamus in mauris fermentum, hendrerit turpis id, ultrices mi. Donec rhoncus ipsum ut ligula suscipit, a semper diam egestas. Sed a feugiat ex.', 68000, 'entry', 'internship', 'hirelocal01@gmail.com'),
    (1, 'Test Title', 'Denver, CO', 80014, 'Test Company inc.', 'This is a test job summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam posuere odio quis tellus rhoncus, dictum congue nisl rhoncus. Praesent et urna purus. Nunc rhoncus, augue in viverra interdum, libero orci porttitor sem, ut viverra ligula nisi quis velit. Curabitur pulvinar sagittis lacus, vel molestie dui. Morbi magna velit, tincidunt at varius a, eleifend a odio. Vestibulum orci ligula, varius nec venenatis id, pretium viverra elit. Mauris est justo, sodales quis posuere nec, rhoncus eget ex. Vestibulum eleifend dolor posuere elementum vulputate. Integer ut mauris eu metus sagittis scelerisque. In sed ligula nulla. Mauris turpis mi, dapibus eget leo sed, tincidunt finibus nisl. Aliquam dapibus risus velit, interdum hendrerit ipsum dignissim quis. In sed lacinia ligula. Vivamus in mauris fermentum, hendrerit turpis id, ultrices mi. Donec rhoncus ipsum ut ligula suscipit, a semper diam egestas. Sed a feugiat ex.', 100000, 'mid', 'temporary', 'hirelocal01@gmail.com'),
    (1, 'Test Title', 'Denver, CO', 80014, 'Test Company inc.', 'This is a test job summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam posuere odio quis tellus rhoncus, dictum congue nisl rhoncus. Praesent et urna purus. Nunc rhoncus, augue in viverra interdum, libero orci porttitor sem, ut viverra ligula nisi quis velit. Curabitur pulvinar sagittis lacus, vel molestie dui. Morbi magna velit, tincidunt at varius a, eleifend a odio. Vestibulum orci ligula, varius nec venenatis id, pretium viverra elit. Mauris est justo, sodales quis posuere nec, rhoncus eget ex. Vestibulum eleifend dolor posuere elementum vulputate. Integer ut mauris eu metus sagittis scelerisque. In sed ligula nulla. Mauris turpis mi, dapibus eget leo sed, tincidunt finibus nisl. Aliquam dapibus risus velit, interdum hendrerit ipsum dignissim quis. In sed lacinia ligula. Vivamus in mauris fermentum, hendrerit turpis id, ultrices mi. Donec rhoncus ipsum ut ligula suscipit, a semper diam egestas. Sed a feugiat ex.', 150000, 'senior', 'full-time', 'hirelocal01@gmail.com');

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
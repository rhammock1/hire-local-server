BEGIN;

TRUNCATE
  "user",
  "jobs";

INSERT INTO "user" ("username", "name", "password")
VALUES
  (
    'admin',
    'Hire Local Admin',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );


INSERT INTO "jobs" ("user_id", "description", "reqs", "salary", "ex_level", "job_type", "contact")
VALUES



COMMIT;
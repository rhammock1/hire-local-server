CREATE TABLE "reqs" (
  "id" INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "job_id" INTEGER REFERENCES "jobs"(id) NOT NULL,
  "requirement" TEXT NOT NULL
);
# Hire Local - Job Posting App API

(Live link to client)[https://hire-local-client.vercel.app/]

This server is made with Node and Express with a PostgreSQL database. This is a job board app that allows users to search for and post new jobs. 

## Documentation

### Open Endpoints

#### GET /api/jobs
   Sample Response: 200 ok

   ```
      "notExpired": [
        {
            "id": 1,
            "user_id": 1,
            "title": "Test Title",
            "description": "This is a test job desription",
            "salary": 85000,
            "exp_level": "mid",
            "job_type": "part-time",
            "expiry": "30 days",
            "location": "Denver, CO",
            "created_on": "2021-02-05T08:45:39.999Z",
            "has_expired": false,
            "contact": "hireLocalTest@gmail.com"
        }, ... ],
      "expired" : []   
   ```

#### GET /api/jobs/:jobId
   Sample Response: 200 ok

   ```
   {
    "id": 1,
    "user_id": 1,
    "title": "Test Title",
    "description": "This is a test job desription",
    "salary": 85000,
    "exp_level": "mid",
    "job_type": "part-time",
    "expiry": "30 days",
    "location": "Denver, CO",
    "created_on": "2021-02-05T08:45:39.999Z",
    "has_expired": false,
    "contact": "hireLocalTest@gmail.com",
    "reqs": [
        {
            "id": 1,
            "job_id": 1,
            "requirement": "2 years with Node.js"
        },
        {
            "id": 2,
            "job_id": 1,
            "requirement": "2 years with Express.js"
        },
        {
            "id": 3,
            "job_id": 1,
            "requirement": "2 years with React"
        },
        {
            "id": 4,
            "job_id": 1,
            "requirement": "2 years with Cloud Services"
        },
        {
            "id": 5,
            "job_id": 1,
            "requirement": "2 years with HTML and CSS"
        }
    ]
   }
   ```

### Closed Endpoints
(Requires a bearer token)
#### POST /api/jobs 
   Sample Request:

   ```
   {
    "title": "Software Engineer III",
    "user_id": "1",
    "description": "Casual company seeking laid-back software person",
    "salary": "420000",
    "exp_level": "senior",
    "job_type": "full-time",
    "contact": "dontemailme@email.com",
    "location": "remote"
    "reqs": [
        {
            "requirement": "2 years in one thing"
        },
        {
            "requirement": "2 years in something"
        },
        {
            "requirement": "2 years in something else"
        },
        {
            "requirement": "2 years in not that"
        },
        {
            "requirement": "2 years in business"
        }
    ]
   }
   ```

   Sample Response: 201 ok

   ```
   {
    "id": 8,
    "user_id": 1,
    "title": "Software Engineer III",
    "description": "Casual company seeking laid-back software person",
    "salary": 420000,
    "exp_level": "senior",
    "job_type": "full-time",
    "expiry": "30 days",
    "location": "remote",
    "created_on": "2021-02-05T09:07:59.060Z",
    "has_expired": false,
    "contact": "dontemailme@email.com",
    "reqs": [
        {
            "requirement": "2 years in one thing"
        },
        {
            "requirement": "2 years in something"
        },
        {
            "requirement": "2 years in something else"
        },
        {
            "requirement": "2 years in not that"
        },
        {
            "requirement": "2 years in business"
        }
    ]
   }
   ```

#### PATCH /api/jobs/:jobId
   Sample Request:

   ```
   {
      "title": "Updated Job Title"
   }
   ```

   Sample Response:

   ```
   {
    "id": 8,
    "user_id": 1,
    "title": "Updated Job Title",
    "description": "Casual company seeking laid-back software person",
    "salary": 420000,
    "exp_level": "senior",
    "job_type": "full-time",
    "expiry": "30 days",
    "location": "remote",
    "created_on": "2021-02-05T09:07:59.060Z",
    "has_expired": false,
    "contact": "dontemailme@email.com",
    "reqs": [
        {
            "requirement": "2 years in one thing"
        },
        {
            "requirement": "2 years in something"
        },
        {
            "requirement": "2 years in something else"
        },
        {
            "requirement": "2 years in not that"
        },
        {
            "requirement": "2 years in business"
        }
    ]
   }
   ```

#### GET /api/saves/:userId

   Sample Response: 200 ok

   ```
    {
    "saves": [
        {
            "id": 1,
            "user_id": 1,
            "job_id": 1
        }
        ]
    }
   ```

#### POST /api/saves/:userId
   Sample Request:

   ```
 
   {
      "user_id": 1,
      "job_id": 1
   }
   ```

   Sample Response: 201 created

   ```
   {
        "id": 1,
        "user_id": 1,
        "job_id": 1
    }
   ```

#### DELETE /api/saves/:userId

Sample Response: 204 No Content

   
#### GET /api/resume/:userId

   Sample Response: 200 ok

   ```
    Postman cannot read .pdf files. As a result, the response view looks very wonky. VScode also requires a special extension to read .pdf files
   ```

#### POST /api/resume/:userId
   Sample Request:

   ```
 
   {
      "resumePDF": resumeFile.pdf
   }
   ```

   Sample Response: 201 created

   ```
   {
    "id": 7,
    "user_id": 1,
    "resume": {
        "type": "Buffer",
        "data": [
            37,
            80,
            68,
            ...
        ],
    },
    "original_name": "resumeFile.pdf"
   }
   ```

#### PATCH /api/resume/:userId
   Sample Request:

   ```
 
   {
      "resumePDF": resumeFile.pdf
   }
   ```

   Sample Response: 204 No Content

#### DELETE /api/resume/:userId

Sample Response: 204 No Content

## Local dev setup

If using user `dunder-mifflin`:

```bash
mv example.env .env
createdb -U dunder-mifflin spaced-repetition
createdb -U dunder-mifflin spaced-repetition-test
```

If your `dunder-mifflin` user has a password be sure to set it in `.env` for all appropriate fields. Or if using a different user, update appropriately.

```bash
npm install
npm run migrate
env MIGRATION_DB_NAME=spaced-repetition-test npm run migrate
```

And `npm test` should work at this point

## Configuring Postgres

For tests involving time to run properly, configure your Postgres database to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
   1. E.g. for an OS X, Homebrew install: `/usr/local/var/postgres/postgresql.conf`
   2. E.g. on Windows, _maybe_: `C:\Program Files\PostgreSQL\11.2\data\postgresql.conf`
   3. E.g  on Ubuntu 18.04 probably: '/etc/postgresql/10/main/postgresql.conf'
2. Find the `timezone` line and set it to `UTC`:

```conf
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests mode `npm test`

Run the migrations up `npm run migrate`

Run the migrations down `npm run migrate -- 0`

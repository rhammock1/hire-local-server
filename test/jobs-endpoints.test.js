const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Jobs Endpoints', () => {

  const testUsers = helpers.makeUsersArray()
  const testUser = testUsers[0]
  const [testJobs, testReqs] = helpers.makeJobAndReqs(testUser)

  before('make knex instance', () => {
    db = helpers.makeKnexInstance()
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))


  describe('GET /api/jobs', () => {
    context('Given there are no jobs in the database' , () => {
        it('responds with 200 and an empty array', () => {
            return supertest(app)
              .get('/api/jobs')
              .expect(200, { notExpired: [], expired: [] })
        })
    })

    context('Given there are jobs in the database', () => {
        
        beforeEach('insert users, jobs and reqs', () => {
            return helpers.seedUsersJobsReqs(
              db,
              testUsers,
              testJobs,
              testReqs,
            )
          })

        it('responds with 200 and an array of jobs', () => {
            return supertest(app)
                .get('/api/jobs')
                .expect(200, { notExpired: testJobs, expired: [] })
        })
    })
  })
  describe('POST /api/jobs', () => {
    beforeEach('insert users, jobs and reqs', () => {
        return helpers.seedUsersJobsReqs(
          db,
          testUsers,
          testJobs,
          testReqs,
        )
      })

    const requiredFields = ['title', 'user_id', 'description', 'exp_level', 'job_type', 'contact'];

    requiredFields.forEach((field) => {
        const newJob = {
            title: 'New Job',
            user_id: 1,
            description: 'Test job description',
            exp_level: 'entry',
            salary: 10000,
            job_type: 'temporary',
            contact: 'testemail@email.com',
        };

        it('responds with 400 error message when a required field is missing', () => {
            delete newJob[field];
            return supertest(app)
                .post('/api/jobs')
                .set('Authorization', helpers.makeAuthHeader(testUser))
                .send(newJob)
                .expect(400, {
                    error: `Missing '${field}' in body`
                })

        })
    })

    it('Creates a new job, responds with 201 and the new job', () => {
        const newJob = {
            title: 'New Job',
            user_id: 1,
            description: 'Test job description',
            exp_level: 'entry',
            salary: 10000,
            job_type: 'temporary',
            contact: 'testemail@email.com',
        };

        return supertest(app)
            .post('/api/jobs')
            .set('Authorization', helpers.makeAuthHeader(testUser))
            .send(newJob)
            .expect(201)
            .expect((res) => {
                expect(res.body.title).to.eql(newJob.title)
                expect(res.body.user_id).to.eql(newJob.user_id)
                expect(res.body.description).to.eql(newJob.description)
                expect(res.body.exp_level).to.eql(newJob.exp_level)
                expect(res.body.salary).to.eql(newJob.salary)
                expect(res.body.job_type).to.eql(newJob.job_type)
                expect(res.body.contact).to.eql(newJob.contact)
            })
    })
  })
  describe('PATCH /api/jobs/:jobId', () => {
    context('Given no jobs', () => {
        it('responds with 404', () => {
          const jobId = 123456;
          return supertest(app)
            .patch(`/api/jobs/${jobId}`)
            .set('Authorization', helpers.makeAuthHeader(testUser))
            .expect(404, { error: `Job doesn't exist` })
        })
      })
    context('Given there are jobs in the database', () => {
        beforeEach('insert users, jobs and reqs', () => {
            return helpers.seedUsersJobsReqs(
              db,
              testUsers,
              testJobs,
              testReqs,
            )
          })
        it('responds with 204 and updates the job', () => {
            const idToUpdate = 1;
            const updatedJob = {
                title: 'New Job',
                user_id: 1,
                description: 'Test job description',
                exp_level: 'entry',
                salary: 10000,
                job_type: 'temporary',
                contact: 'testemail@email.com',
            }
            const expectedJob = {
                ...testJobs[idToUpdate - 1],
                ...updatedJob
            }
            return supertest(app)
                .patch(`/api/jobs/${idToUpdate}`)
                .set('Authorization', helpers.makeAuthHeader(testUser))
                .send(updatedJob)
                .expect(204)

        })
    })
  })
})
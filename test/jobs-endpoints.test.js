const supertest = require('supertest')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe.only('Jobs Endpoints', () => {

  const testUsers = helpers.makeUsersArray()
  const [testUser] = testUsers
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
              .expect(200, [])
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
                .expect(200, testJobs)
        })
    })
  })

})
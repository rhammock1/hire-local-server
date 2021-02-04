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

  beforeEach('insert users, languages and words', () => {
    return helpers.seedUsersJobsReqs(
      db,
      testUsers,
      testJobs,
      testReqs,
    )
  })

  context('Given there are no jobs in the database' , () => {
      it('responds with 200 and an empty array', () => {
          return supertest(app)
            .get('/api/jobs')
            .expect(200, [])
      })
  })
})
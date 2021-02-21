const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Protected Endpoints', function () {
  let db

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

  beforeEach('insert users, jobs and reqs', () => {
    return helpers.seedUsersJobsReqs(
      db,
      testUsers,
      testJobs,
      testReqs,
    )
  })

  const protectedEndpoints = [
    {
      name: 'POST /api/jobs',
      path: '/api/jobs',
      method: supertest(app).post,
    },
    {
      name: 'PATCH /api/jobs/1',
      path: '/api/jobs/1',
      method: supertest(app).patch,
    },
    {
      name: 'GET /api/saves/:userId',
      path: '/api/saves/1',
      method: supertest(app).get,
    },
    {
      name: 'POST /api/saves/:userId',
      path: '/api/saves/1',
      method: supertest(app).post,
    },
    {
      name: 'DELETE /api/saves/:userId',
      path: '/api/saves/1',
      method: supertest(app).delete,
    },
    {
      name: 'GET /api/resume/:userId',
      path: '/api/resume/1',
      method: supertest(app).get,
    },
    {
      name: 'POST /api/resume/:userId',
      path: '/api/resume/1',
      method: supertest(app).post,
    },
    {
      name: 'DELETE /api/resume/:userId',
      path: '/api/resume/1',
      method: supertest(app).delete,
    },
  ]

  protectedEndpoints.forEach(endpoint => {
    describe(endpoint.name, () => {
      it(`responds 401 'Missing bearer token' when no bearer token`, () => {
        return endpoint.method(endpoint.path)
          .expect(401, { error: `Missing bearer token` })
      })

      it(`responds 401 'Unauthorized request' when invalid JWT secret`, () => {
        const validUser = testUsers[0]
        const invalidSecret = 'bad-secret'
        return endpoint.method(endpoint.path)
          .set('Authorization', helpers.makeAuthHeader(validUser, invalidSecret))
          .expect(401, { error: `Unauthorized request` })
      })

      it(`responds 401 'Unauthorized request' when invalid sub in payload`, () => {
        const invalidUser = { username: 'user-not-existy', id: 1 }
        return endpoint.method(endpoint.path)
          .set('Authorization', helpers.makeAuthHeader(invalidUser))
          .expect(401, { error: `Unauthorized request` })
      })
    })
  })
})

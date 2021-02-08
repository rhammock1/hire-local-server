const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Saves endpoints', () => {
    const testUsers = helpers.makeUsersArray()
    const testUser = testUsers[0]
    const [testJobs, testReqs, testSaves] = helpers.makeJobAndReqs(testUser)

    before('make knex instance', () => {
        db = helpers.makeKnexInstance()
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe('GET /api/saves', () => {
        context('Given there are no saves in the database' , () => {
            it('responds with 200 and an empty array', () => {
                return supertest(app)
                  .get(`/api/saves/${testUser.id}`)
                  .expect(200, [])
            })
        })
        context('Given there are saves in the database', () => {
            it('responds with 200 and the user\'s saves', () => {
                return supertest(app)
                    .get(`/api/saves/${testUser.id}`)
                    .expect(200, testSaves)
            })
        })
    })
})
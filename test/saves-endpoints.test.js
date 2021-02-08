const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe.only('Saves endpoints', () => {
    const testUsers = helpers.makeUsersArray()
    const testUser = testUsers[0]
    const [testJobs, testReqs, testSaves] = helpers.makeJobAndReqs(testUser)
    console.log('line 10', testSaves);
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
                  .set('Authorization', helpers.makeAuthHeader(testUser))
                  .expect(200, {saves: []})
            })
        })
        context('Given there are saves in the database', () => {
            beforeEach('insert users, jobs and reqs', () => {
                return helpers.seedUsersJobsReqs(
                  db,
                  testUsers,
                  testJobs,
                  testReqs,
                  testSaves,
                )
              })
            it('responds with 200 and the user\'s saves', () => {
                const expectedSave = { id: 1, user_id: 1, job_id: 1 }
                return supertest(app)
                    .get(`/api/saves/${testUser.id}`)
                    .set('Authorization', helpers.makeAuthHeader(testUser))
                    .expect(200, { saves: [expectedSave] })
            })
        })
    })
    describe('POST /api/saves/:userId', () => {
        const requiredFields = ['user_id', 'job_id'];

        requiredFields.forEach((field) => {
            const newSave = {
                user_id: 1,
                job_id: 2,
            };

            it('responds with 400 error message when a required field is missing', () => {
                delete newSave[field];
                return supertest(app)
                    .post(`/api/saves/1`)
                    .set('Authorization', helpers.makeAuthHeader(testUser))
                    .send(newSave)
                    .expect(400, {
                        error: `Missing '${field}' in body`
                    })

            })
        })
        it('Creates a new job, responds with 201 and the new job', () => {
            const newSave = {
                user_id: 1,
                job_id: 2,
            };
    
            return supertest(app)
                .post('/api/saves/1')
                .set('Authorization', helpers.makeAuthHeader(testUser))
                .send(newSave)
                .expect(201)
                .expect((res) => {
                    expect(res.body).to.have.property('id')
                    expect(res.body.user_id).to.eql(newSave.user_id)
                    expect(res.body.job_id).to.eql(newSave.job_id)
                })
        })
    }) 
})
const knex = require('knex')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/**
 * create a knex instance connected to postgres
 * @returns {knex instance}
 */
function makeKnexInstance() {
  return knex({
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
  })
}

/**
 * create a knex instance connected to postgres
 * @returns {array} of user objects
 */
function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'test-user-1',
      name: 'Test user 1',
      password: 'password',
    },
    {
      id: 2,
      username: 'test-user-2',
      name: 'Test user 2',
      password: 'password',
    },
  ]
}

/**
 * generate fixtures of jobs and job requirements for a given user
 * @param {object} user - contains `id` property
 * @returns {Array(jobs, reqs)} - arrays of jobs and reqs
 */
function makeJobAndReqs(user) {
  const job = [
    {
      id: 1,
      user_id: user.id,
      title: 'Test Title',
      created_on: "2021-02-04T15:03:29.251Z",
      company: 'Test Company inc.',
      expiry: "30 days",
      has_expired: false,
      summary: 'This is a test job summary',
      description: 'This is a test job desription',
      salary: "85000",
      exp_level: 'mid',
      zipcode: '28217',
      location: 'Charlotte, NC',
      job_type: 'part-time',
      contact: 'testemail@email.com',
    },
  ]

  const reqs = [
    {
      job_id: 1,
      requirement: '2 years with Node.js',
    },
    {
      job_id: 1,
      requirement: '2 years with React.js',
    },
    {
      job_id: 1,
      requirement: '2 years with Express.js',
    },
    {
      job_id: 1,
      requirement: '2 years with Cloud services',
    },
    {
      job_id: 1,
      requirement: '2 years with any relational database',
    },
  ]

  const saves = [
    {
      user_id: user.id,
      job_id: 1
    }
  ]

  const applied = [
    {
      user_id: user.id,
      job_id: 1
    }
  ]

  return [job, reqs, saves, applied]
}

/**
 * make a bearer token with jwt for authorization header
 * @param {object} user - contains `id`, `username`
 * @param {string} secret - used to create the JWT
 * @returns {string} - for HTTP authorization header
 */
function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

/**
 * remove data from tables and reset sequences for SERIAL id fields
 * @param {knex instance} db
 * @returns {Promise} - when tables are cleared
 */
function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        "user_applied",
        "user_saves",
        "reqs",
        "jobs",
        "user"
        RESTART IDENTITY CASCADE;`
      )
  )
}

/**
 * insert users into db with bcrypted passwords and update sequence
 * @param {knex instance} db
 * @param {array} users - array of user objects for insertion
 * @returns {Promise} - when users table seeded
 */
function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.transaction(async trx => {
    await trx.into('user').insert(preppedUsers)

  })
}

/**
 * seed the databases with words and update sequence counter
 * @param {knex instance} db
 * @param {array} users - array of user objects for insertion
 * @param {array} jobs - array of job objects for insertion
 * @param {array} reqs - array of requirement objects for insertion
 * @returns {Promise} - when all tables seeded
 */
async function seedUsersJobsReqs(db, users, jobs, reqs, saves, applied) {
  await seedUsers(db, users)

  await db.transaction(async trx => {
    await trx.into('jobs').insert(jobs)
    await trx.into('reqs').insert(reqs)
    await trx.into('user_saves').insert(saves)
    await trx.into('user_applied').insert(applied)
  })
}

module.exports = {
  makeKnexInstance,
  makeUsersArray,
  makeJobAndReqs,
  makeAuthHeader,
  cleanTables,
  seedUsers,
  seedUsersJobsReqs,
}

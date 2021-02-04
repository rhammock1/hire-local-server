const jobsSerivice = {

    getAllJobs(knex) {
        return knex.select('*').from('jobs');
    },

    insertNewJob(knex, newJob) {
        return knex
            .insert(newJob)
            .into('jobs')
            .returning('*')
            .then((rows) => rows[0]);
    }
}

module.exports = jobsSerivice;
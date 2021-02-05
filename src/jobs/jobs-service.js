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
    },
    
    getById(knex, jobId) {
        return knex
            .from('jobs')
            .select('*')
            .where('id', jobId)
            .first();
    },

    getReqsById(knex, jobId) {
        return knex
            .from('reqs')
            .select('*')
            .where('job_id', jobId)
    },

    updateJob(knex, id, newJobFields) {
        return knex('jobs')
            .where({ id })
            .update(newJobFields)
    }

}

module.exports = jobsSerivice;
const jobsSerivice = {
    getAllJobs(knex) {
        return knex.select('*').from('jobs');
    }
}

module.exports = jobsSerivice;
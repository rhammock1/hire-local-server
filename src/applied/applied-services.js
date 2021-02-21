const appliedServices = {

    getAllUsersApplied(knex, user_id) {
        return knex
            .from('user_applied')
            .select('*')
            .where({ user_id })
    },

    insertNewApplied(knex, appliedJob) {
        return knex
            .insert(appliedJob)
            .into('user_applied')
            .returning('*')
            .then((rows) => rows[0]);
    }
}

module.exports = appliedServices;
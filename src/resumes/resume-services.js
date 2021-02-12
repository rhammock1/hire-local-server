const resumeServices = {
    
    insertResume(knex, file) {
        return knex
            .into('user_resume')
            .insert(file)
            .returning('*')
            .then((rows) => rows[0]);
    },

    getByUserId(knex, id) {
        return knex
            .from('user_resume')
            .select('*')
            .where('user_id', id)
            .first();
    },

};

module.exports = resumeServices;
const savesService = {
    getUserSaves(knex, user_id) {
        return knex
            .from('user_saves')
            .where({ user_id })
            .select('*')
    },
    insertNewSave(knex, newSave) {
        return knex
            .insert(newSave)
            .into('user_saves')
            .returning('*')
            .then((rows) => rows[0]);
    },
}

module.exports = savesService;
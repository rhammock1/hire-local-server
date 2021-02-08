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
    getById(knex, saveId) {
        return knex
            .from('user_saves')
            .select('*')
            .where('id', saveId)
            .first();
    },
    delete(knex, saveId) {
        return knex 
            .from('user_saves')
            .select('*')
            .where('id', saveId)
            .delete();
    }
}

module.exports = savesService;
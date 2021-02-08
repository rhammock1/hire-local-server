const savesService = {
    getUserSaves(knex, user_id) {
        return knex
            .from('user_saves')
            .where({ user_id })
            .select('*')
    }
}

module.exports = savesService;
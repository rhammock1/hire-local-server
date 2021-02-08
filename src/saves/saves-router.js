const express = require('express');
const { requireAuth } = require('../middleware/jwt-auth');
const savesService = require('./saves-service');
const jsonParser = express.json();
const savesRouter = express.Router();

savesRouter
    .route('/:userId')
    .get((req, res, next) => {
        const db = req.app.get('db')
        const { userId } = req.params;
        console.log(userId);
        savesService.getUserSaves(db, userId)
            .then((saves) => res.status(200).json({ saves }))
            .catch(next);
    })

module.exports = savesRouter;
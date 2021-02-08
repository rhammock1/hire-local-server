const { json } = require('express');
const express = require('express');
const { requireAuth } = require('../middleware/jwt-auth');
const savesService = require('./saves-service');
const path = require('path');
const jsonParser = express.json();
const savesRouter = express.Router();

savesRouter
    .route('/:userId')
    .get((req, res, next) => {
        const db = req.app.get('db')
        const { userId } = req.params;
        savesService.getUserSaves(db, userId)
            .then((saves) => res.status(200).json({ saves }))
            .catch(next);
    })
    .post(jsonParser, (req, res, next) => {
        const db = req.app.get('db');
        const { userId } = req.params;
        const { job_id } = req.body;
        if (!job_id) {
            return res.status(400).json({ error: `Missing 'job_id' in body`})
        }

        const newSave = { user_id: userId, job_id: job_id };
        savesService.insertNewSave(db, newSave)
            .then((save) => res.status(201).location(path.posix.join(req.originalUrl, `/${save.id}`))
            .json(save))
            .catch(next);
    })

module.exports = savesRouter;
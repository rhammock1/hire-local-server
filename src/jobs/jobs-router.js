const express = require('express');
const jsonParser = express.json();
const jobsRouter = express.Router();
const jobsSerivice = require('./jobs-service');

jobsRouter
    .route('/')
    .get((req, res, next) => {
        const db = req.app.get('db');
        jobsSerivice.getAllJobs(db)
            .then((jobs) => {
                return res.status(200).json(jobs);
            })
            .catch(next)
    })

module.exports = jobsRouter;
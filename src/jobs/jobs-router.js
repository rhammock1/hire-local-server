const express = require('express');
const jsonParser = express.json();
const jobsRouter = express.Router();
const path = require('path');
const jobsSerivice = require('./jobs-service');
const { requireAuth } = require('../middleware/jwt-auth');

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
    .post(requireAuth, jsonParser, (req, res, next) => {
        const {
            title,
            user_id,
            description,
            salary,
            exp_level,
            job_type,
            expiry,
            contact,
        } = req.body;

        const requiredFields = ['title', 'user_id', 'description', 'exp_level', 'job_type', 'contact'];
        
        const newJob = {
            title,
            user_id,
            description,
            salary,
            exp_level,
            job_type,
            expiry,
            contact,
        }

        let error;
        const hasAllRequired = requiredFields.map((field) => {
            if(!newJob[field]) {
                error = `Missing '${field}' in body`
                return false;
            }
        })
        if(hasAllRequired.includes(false)) {
            return res.status(400).json( {
                error: error
            })
        } else {
            const db = req.app.get('db');
            jobsSerivice.insertNewJob(db, newJob)
                .then((job) => {
                    return res.status(201)
                        .location(path.posix.join(req.originalUrl, `/${job.id}`))
                        .json(job);
                })
                .catch(next);
        }

        

    })

jobsRouter
    .route('/:jobId')
    .all(checkJobExists)
    .get((req, res, next) => {
        return res.status(200).json(res.job);
    })

async function checkJobExists(req, res, next) {
    const db = req.app.get('db');
    const { jobId } = req.params
    try {
        const job = await jobsSerivice.getById(db, jobId);
        if (!job) {
            return res.status(404).json({
                error: 'Job doesn\'t exist'
            });
        }
        res.job = job;
        next();
    } catch(error) {
        next(error);
    }
}
module.exports = jobsRouter;
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
                let notExpired = [];
                let expired = [];
                jobs.forEach((job) => (!job.has_expired) ? notExpired.push(job) : expired.push(job))
                return res.status(200).json({ notExpired, expired });
            })
            .catch(next)
    })
    .post(requireAuth, jsonParser, (req, res, next) => {
        const {
            title,
            user_id,
            summary,
            company,
            description,
            salary,
            exp_level,
            job_type,
            expiry,
            zipcode,
            location,
            contact,
            reqs
        } = req.body;
        console.log(reqs);
        const requiredFields = ['title', 'user_id', 'company', 'description', 'exp_level', 'zipcode', 'job_type', 'contact', 'location'];
        
        const newJob = {
            title,
            user_id: parseFloat(user_id),
            zipcode,
            summary,
            company,
            description,
            salary: parseFloat(salary),
            exp_level,
            job_type,
            location,
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
                    if (reqs) {
                        const reqsToInsert = reqs.map((req) => ({
                            job_id: job.id,
                            requirement: req.requirement
                        }) )
                        jobsSerivice.insertNewReq(db, reqsToInsert)
                            .then((req) => console.log(req))
                            .catch(next);
                    }
                    job.reqs = reqs;
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
    .patch(requireAuth, jsonParser, (req, res, next) => {
        const {
            title = res.job.title,
            user_id = res.job.user_id,
            zipcode = res.job.zipcode,
            summary = res.job.summary,
            company = res.job.company,
            description = res.job.description,
            salary = res.job.salary,
            exp_level = res.job.exp_level,
            job_type = res.job.job_type,
            expiry = res.job.expiry,
            contact = res.job.contact,
            has_expired = res.job.has_expired,
        } = req.body;

        const updatedJob = {
            title,
            user_id,
            zipcode,
            summary,
            company,
            description,
            salary,
            exp_level,
            job_type,
            expiry,
            contact,
            has_expired           
        };
        const db = req.app.get('db');
        jobsSerivice.updateJob(db, req.params.jobId, updatedJob)
            .then(() => {
                return res.status(204).end();
            })
            .catch(next);
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
        const reqs = await jobsSerivice.getReqsById(db, jobId)
        res.job = job;
        res.job.reqs = reqs;
        next();
    } catch(error) {
        next(error);
    }
}
module.exports = jobsRouter;
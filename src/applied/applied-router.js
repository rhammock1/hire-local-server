require('dotenv').config();
const { SENDGRID_API_KEY } = process.env;
const express = require('express');
const jsonParser = express.json();
const appliedRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth');
const multer = require('multer');
const resumeServices = require('../resumes/resume-services');
const jobsSerivice = require('../jobs/jobs-service');
const path = require('path');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const sgMail = require('@sendgrid/mail');
const appliedServices = require('./applied-services');
sgMail.setApiKey(SENDGRID_API_KEY);


appliedRouter
    .route('/:userId')
    .get((req, res, next) => {
        const db = req.app.get('db');
        const { userId } = req.params;
        appliedServices.getAllUsersApplied(db, userId)
            .then((applied) => res.status(200).json(applied))
            .catch(next);
    })
    .post(upload.single('coverLetter'), jsonParser, async (req, res, next) => {
        // get user resume from db and accept CL upload from req.
        const coverLetter = req.file;
        
        const { jobId } = req.body;

        if (!jobId) {
            return res.status(400).json({ error: 'Body must contain job id' });
        }
        
        const db = req.app.get('db');
        const { userId } = req.params;
       
        const { jobObj, resumeObj, fileData } = await getJobAndResume(jobId, userId, db, req, res, next);
        
        const attachments = 
            (!coverLetter) 
                ? [{
                    content: fileData.toString('base64'),
                    filename: resumeObj.original_name,
                    type: 'application/pdf',
                    disposition: 'attachment',
                    contentId: 'resumePDF',
                }]
                : [
                    {
                        content: fileData.toString('base64'),
                        filename: resumeObj.original_name,
                        type: 'application/pdf',
                        disposition: 'attachment',
                        contentId: 'resumePDF',
                    },
                    {
                        content: coverLetter.buffer.toString('base64'),
                        filename: coverLetter.originalname,
                        type: 'application/pdf',
                        disposition: 'attachment',
                        contentId: 'coverLetter',
                    },
                ];

        const msg = {
            to: jobObj.contact,
            from: 'hireLocal01@gmail.com',
            subject: `Application for job: ${jobObj.title}`,
            text: 'This is just a little test',
            attachments: attachments
        };

        await sgMail
            .send(msg)
            .then(() => console.log('email sent'))
            .catch(next);
        
        const newApplied = {
            user_id: userId,
            job_id: jobId
        };

        return await appliedServices.insertNewApplied(db, newApplied)
            .then((applied) => res.status(201).json(applied))
            .catch(next);
          
    })

async function getJobAndResume(jobId, userId, db, req, res, next) {
    let jobObj = {};
    
    await jobsSerivice.getById(db, jobId)
        .then((job) => {
            
            jobObj = job})
        .catch(next)
    if (!jobObj) {
        return res.status(404).json({
            error: 'Job doesn\'t exist'
        });
    }
    let fileData = {};
    let resumeObj = {};
    await resumeServices.getByUserId(db, userId)
        .then((resume) => {
            
            if (!resume) {
                
                return res.status(404).json({ error: 'No resume found for the selected user'});
            }
            resumeObj = resume;
            fileData = Buffer.from(resume.resume); 
        })
        .catch(next)

    return {
        jobObj,
        resumeObj,
        fileData
    }
}

module.exports = appliedRouter;
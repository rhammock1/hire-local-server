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
sgMail.setApiKey(SENDGRID_API_KEY);


appliedRouter
    .route('/:userId')
    .post(upload.single('coverLetter'), jsonParser, async (req, res, next) => {
        // get user resume from db and accept CL upload from req.
        const coverLetter = req.file;
        const { jobId } = req.body;
        console.log(coverLetter);
        const db = req.app.get('db');
        const { userId } = req.params;
        
        const { jobObj, resumeObj, fileData } = await getJobAndResume(jobId, userId, db, next);
        
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
            to: 'rhamm1027@gmail.com',
            from: 'hireLocal01@gmail.com',
            subject: `Application for job: ${jobObj.title}`,
            text: 'This is just a little test',
            attachments: attachments
        };

        return sgMail
            .send(msg)
            .then(() => res.status(201).json({ message: `Successfully applied to the ${jobObj.title} position at` }))
            .catch(next);
        
    })

async function getJobAndResume(jobId, userId, db, next) {
    let jobObj;
    await jobsSerivice.getById(db, jobId)
        .then((job) => jobObj = job)
        .catch(next)
    if (!jobObj) {
        return res.status(404).json({
            error: 'Job doesn\'t exist'
        });
    }
    let fileData;
    let resumeObj;
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
const express = require('express');
const resumeRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth');
const multer = require('multer');
const resumeServices = require('./resume-services');
const path = require('path');
const fs = require('fs');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// TODO figure out how to store the resumes for each user

resumeRouter
    .route('/:userId')
    .get((req, res, next) => {
        const db = req.app.get('db');
        const { userId } = req.params;
        resumeServices.getByUserId(db, userId)
            .then((resume) => {
                
                if (!resume) {
                    return res.status(404).json({ error: 'No resume found for the selected user'});
                }
                const fileData = new Buffer(resume.resume); 
                // fs.writeFile(resume.original_name, fileData, (err) => (err) ? console.error(err) : null);
                res.writeHead(200, { 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename=${resume.original_name}`, 'Content-Length': fileData.length }); 
                res.write(fileData);
                
                res.end();
                

            })
            .catch(next)
    })
    .post(upload.single('resumePDF'), (req, res, next) => {
        const { file } = req;
        const db = req.app.get('db');
        const { userId } = req.params;
        if (!file) {
            return res.status(400).json({ error: 'Please upload a file' });
        }
        console.log(file);
        const fileObj = {
            user_id: userId,
            resume: file.buffer,
            original_name: file.originalname
        };
        console.log(fileObj)
        resumeServices.insertResume(db, fileObj)
            .then((resume) => (
                res.status(201)
                .location(path.posix.join(req.originalUrl, `/${resume.id}`))
                .json(resume)
            ))
            .catch(next);
    })
    // Just need to add a patch and delete endpoint with tests and documentation


module.exports = resumeRouter;



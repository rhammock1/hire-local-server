const express = require('express');
const resumeRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth');


// TODO figure out how to store the resumes for each user

resumeRouter
    .route('/')
    .get((req, res, next) => {
        // Should get resume that is stored in fs
    })
    .post((req, res, next) => {
        // Should store resume in fs and make record in database of the path
    })
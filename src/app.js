const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const errorHandler = require('./middleware/error-handler');
const authRouter = require('./auth/auth-router');
const userRouter = require('./user/user-router');
const jobsRouter = require('./jobs/jobs-router');
const savesRouter = require('./saves/saves-router');
const resumeRouter = require('./resumes/resume-router');

const app = express();

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}));

app.use(cors());
app.use(helmet());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/saves', savesRouter);
app.use('/api/resume', resumeRouter);

app.use(errorHandler);

module.exports = app;

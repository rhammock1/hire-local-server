const express = require('express');
const cltRouter = express.Router();
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const urlQ = 'https://charlotte.axios.com/jobs/';
const allCatButton = '#allchecked';
const searchButton = '#jobsearchsubmit'

const getJobs = async () => {
    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] });
    const page = await browser.newPage();

    await page.goto(urlQ, { waitUntil: 'networkidle0' })
    await page.click(allCatButton);
    const waitOptions = { waitUnitl: 'networkidle0' };
    await Promise.all([
        page.waitForNavigation(waitOptions),
        page.click(searchButton),
    ])
    let jobs;
    const $ = cheerio.load(page.content());
    await page.evaluate(() => {
        // const content = page.content();
        

        jobs = $('.joblistpost').get();
        
    })
    // const content = await page.content();
    // const $ = cheerio.load(content);

    // const jobs = $('.joblistpost').get();
   
    // const jobs = content
    //     .then((success) => {
    //         const $ = cheerio.load(success)
    //         const jobPost = $('.joblistpost').html;
    //         console.log(jobPost);
    //         return jobPost;
    //     })
    

    // let data = await page.evaluateHandle(() => {
    //     // on the right track with this query
    //     // right now it only returns an obj of empty obj for each joblist post
    //     // const all = [];
    //     // const jobs = document.querySelectorAll('.joblistpost');
    //     // console.log(jobs);
    //     // jobs.map((job) => all.push(job.innerHTML));
    //     // // let jobs = [];
    //     // // jobs.push({ job });
    //     // console.log('line 20', all);
    //     // return all;
    //     return document.body;
    // });

    console.log('line 24', data);
    await browser.close();
    return data;
};

cltRouter
    .route('/')
    .get(async (req, res, next) => {
        const jobs = await getJobs();
        
        res.status(200).end();
    })


module.exports = cltRouter;
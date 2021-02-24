const express = require('express');
const cltRouter = express.Router();
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const urlQuery = 'https://charlotte.axios.com/jobs/';
const allCategoriesButton = '#allchecked';
const searchButton = '#jobsearchsubmit'

const getJobs = async () => {
    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] });
    const page = await browser.newPage();

    await page.goto(urlQuery, { waitUntil: 'networkidle0' })
    await page.click(allCategoriesButton);
    const waitOptions = { waitUnitl: 'networkidle0' };
    await Promise.all([
        page.waitForNavigation(waitOptions),
        page.click(searchButton),
    ])
    let jobs;
    const $ = cheerio.load(page.content());
    // Need to use cheerio and figure out the proper way to load the page so that it can pick out the proper elements
    // Each job post is at div.joblistpost

};

cltRouter
    .route('/')
    .get(async (req, res, next) => {
        const jobs = await getJobs();
        
        res.status(200).end();
    })


module.exports = cltRouter;
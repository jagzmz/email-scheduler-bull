'use strict';
const { Router } = require('express');
const config = require('../../config');
const { JobControllers } = require('../controllers/');
const emailJobValidator = require('../middlewares/emailJobValidator');

const route = Router();

module.exports = (app) => {
    app.use('/jobs', route);
    route.get('/', async (req, res, next) => {
        return res.json({
            message: 'Hi',
        });
    });

    route.post('/', emailJobValidator, JobControllers.newJob);
};

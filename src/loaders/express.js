const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('../api');
const EmailQueue = require('../jobs/emailJob');
const { UI } = require('bull-board');

module.exports = async ({ app }) => {
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });
    app.enable('trust proxy');
    app.use(cors());
    app.use(require('morgan')('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use('/api', routes());
    app.use('/admin/queues', UI);
    return app;
};

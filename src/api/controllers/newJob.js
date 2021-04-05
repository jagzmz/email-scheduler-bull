'use strict';

const EmailJobs = require('../../jobs/emailJob');

module.exports = (req, res, next) => {
    // const { add } = EmailJobs;
    const jobName = req.body.name;
    EmailJobs.add({ name: jobName }).then((e) => {
        return res.json({
            message: 'OK',
        });
    });
};

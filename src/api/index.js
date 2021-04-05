const { Router } = require('express');
const jobs = require('./routes/jobs');

module.exports = () => {
    const app = Router();
    jobs(app);
    return app;
};

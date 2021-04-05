'use strict';
const moment = require('moment');
const Logger = require('../../utils/Logger');
/**
 *
 * @param {import('bull').Job} job
 */
const emailProcessor = async (job) => {
    const before = moment();
    console.log('email job running...');
};

/**
 * This handler is called on job success
 * @param {import('bull').Job} job
 * @param {Object} result
 */
const jobSuccessHandler = (job, result) => {
    Logger.log(`${job} success. Result ${result}`);
};

/**
 * This handler is called on job fails
 * @param {import('bull').Job} job
 * @param {Error} err
 */
const jobFailureHandler = (job, err) => {
    Logger.error(`${job} error. Error message ${err}`);
};

module.exports = {
    emailProcessor,
    jobSuccessHandler,
    jobFailureHandler,
};

const Queue = require('bull');
const {
    emailProcessor,
    jobSuccessHandler,
    jobFailureHandler,
} = require('./handler');
const config = require('../../config');
class EmailJobs {
    constructor() {}

    /**
     * @returns {import('bull').Queue} emailQueue
     */
    get queue() {
        return this.emailQueue;
    }

    /**
     * @returns {import('bull').Queue} emailQueue
     */
    init() {
        // Making sure Queue is instantiated once
        if (this.queue) {
            return this.queue;
        }
        const emailQueue = Queue('Email Queue');
        emailQueue.process('sendEmail', emailProcessor);
        emailQueue.on('completed', jobSuccessHandler);
        emailQueue.on('failed', jobFailureHandler);
        this.emailQueue = emailQueue;
        return this.queue;
    }

    /**
     *
     * @param {Object} data
     * @param {import('bull').JobOptions} opts
     */
    async add(data, opts = {}) {
        return this.queue.add('sendEmail', data, {
            delay: 30000,
            backoff: 1000,
            attempts: 10,
        });
    }
}

module.exports = new EmailJobs();

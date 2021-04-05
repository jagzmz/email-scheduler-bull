const expressLoader = require('./express');
const { setQueues, UI } = require('bull-board');
const EmailQueue = require('../jobs/emailJob');
const Eventtool = require('./eventtool');
module.exports = async ({ expressApp }) => {
    await expressLoader({ app: expressApp });
    console.log('Express Initialized');

    // Generate Eventtool AccessToken
    await Eventtool.init();

    // Initialize Email Queue
    const emailQueue = EmailQueue.init();
    console.log('Email Queue Initialized');

    //Set Queues for admin dashboard bullBoard
    setQueues([emailQueue]);
};

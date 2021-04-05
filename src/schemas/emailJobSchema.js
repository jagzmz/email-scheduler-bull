const Joi = require('joi');

/**
 * @returns {Joi} emailSchema
 */
module.exports = Joi.object({
    jobName: Joi.string().min(3).max(30).required(),
    channel: Joi.string().equal('email').required(),
    scheduledAt: Joi.date().greater('now').required(), // single date according to design
    templateWhere: Joi.string().required(),
    wherePid: Joi.number().required(),
    sendOnce: Joi.boolean().required(),
    rangeFilter: Joi.object().required(),
    dataFields: Joi.object(),
    recipients: Joi.array().items(Joi.string()),
});

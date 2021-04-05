const Joi = require('joi');

/**
 * @returns {Joi} sendEmailSchema
 */
module.exports = Joi.object({
    where: Joi.object().required(), // templateWhere
    data: Joi.object(),
    providerFields: Joi.object(),
    extras: Joi.object(),
});

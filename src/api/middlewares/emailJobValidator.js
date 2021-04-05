const Joi = require('joi');
const { emailJobSchema } = require('../../schemas');
const Logger = require('../../utils/Logger');
module.exports = (req, res, next) => {
    const { error } = emailJobSchema.validate(req.body || {}, {
        abortEarly: false,
    });
    if (!error) {
        next();
    } else {
        const { details } = error;
        const messages = details.map((i) => i.message);
        Logger.error(`Validation error ${messages}`);
        res.status(422).json({ errors: messages });
    }
};

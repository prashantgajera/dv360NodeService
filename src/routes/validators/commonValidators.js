const Joi = require("joi");

const defaultRequestParams = {
    application: Joi.string().allow(null),
    userId: Joi.number().greater(0).allow(null),
};

module.exports = {
    defaultRequestParams,
};

const Joi = require('joi');

const bodySchema = Joi.object({
	title: Joi.string().required(),
	author: Joi.string().required(),
	summary: Joi.string().required(),
});

module.exports = {bodySchema};

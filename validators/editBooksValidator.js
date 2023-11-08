const Joi = require('joi');

const pathParamsSchema = Joi.object({
	id: Joi.string()
		.required()
		.regex(/^[0-9a-fA-F]{24}$/, 'object Id'),
});
const bodySchema = Joi.object({
	title: Joi.string().optional(),
	author: Joi.string().optional(),
	summary: Joi.string().optional(),
});

module.exports = {pathParamsSchema, bodySchema};

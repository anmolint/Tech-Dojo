const Joi = require('joi');

const pathParamsSchema = Joi.object({
	id: Joi.string()
		.required()
		.regex(/^[0-9a-fA-F]{24}$/, 'object Id'),
});

module.exports = {pathParamsSchema};

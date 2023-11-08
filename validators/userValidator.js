const Joi = require('joi');

const bodySchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

module.exports = {bodySchema};

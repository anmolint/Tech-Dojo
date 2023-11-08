const Joi = require('joi');
const {Logger} = require('../logger');
const CustomError = require('./customError');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
	Logger.error(err);

	if (err instanceof CustomError) {
		return res.status(err.statusCode).json({code: err.code, error: err.message});
	}

	if (Joi.isError(err)) {
		return res.status(400).json({error: err.details.map(detail => detail.message)});
	}

	return res.status(500).json({error: 'Internal Server Error'});
}

module.exports = errorHandler;

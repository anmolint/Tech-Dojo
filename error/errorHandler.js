const Joi = require('joi');
const jwt = require('jsonwebtoken');
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

	if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError) {
		return res.status(401).json({code: 'UNAUTHORIZED', error: 'Not-Authorized-To-Access-The-Resource'});
	}

	return res.status(500).json({code: 'Internal_Server_Error', error: 'Internal Server Error'});
}

module.exports = errorHandler;

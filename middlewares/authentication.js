const jwt = require('jsonwebtoken');
const {User} = require('../database/models');
const CustomError = require('../error/customError');

const authenticate = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		const token = authHeader?.split(' ')[1];
		if (!token) {
			throw new CustomError('UNAUTHORIZED', 'PLEASE-LogIn-To-Access-this-Resource ', 401);
		}

		const decoded = jwt.verify(token, process.env.secretKey);
		const {id} = decoded;
		const user = await User.findById(id);
		if (!user) {
			throw new CustomError('UNAUTHORIZED', 'PLEASE-LogIn-To-Access-this-Resource ', 401);
		}

		next();
	} catch (error) {
		next(error);
	}
};

module.exports = authenticate;

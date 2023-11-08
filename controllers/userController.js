const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../database/models');
const CustomError = require('../error/customError');

const register = async (req, res, next) => {
	try {
		const {email, password} = req.body;
		const encryptedPassword = await bcrypt.hash(password, 10);
		const isRegistered = await User.findOne({email});
		if (isRegistered) {
			throw new CustomError('DUPLICATE_USER', 'User With Given Email Already Exists', 409);
		}

		await User.create({email, password: encryptedPassword});
		return res.status(200).json({code: 'User-Created-Successfully', message: 'You Have Been Registered to the Book lab successfully'});
	} catch (error) {
		next(error);
	}
};

const login = async (req, res, next) => {
	try {
		const {email, password} = req.body;
		const user = await User.findOne({email});
		if (!user) {
			throw new CustomError('USER_NOT_FOUND', 'User does not exist', 404);
		}

		const passwordsMatch = await bcrypt.compare(password, user.password);
		if (!passwordsMatch) {
			throw new CustomError('Invalid_Credentials', 'Incorrect Email or Password', 400);
		}

		const token = jwt.sign({id: user._id}, process.env.secretKey, {expiresIn: '1h'});
		return res.status(200).json({code: 'User-LoggedIn-Successfully', message: 'You logged in to the Book lab successfully', token});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	register,
	login,
};

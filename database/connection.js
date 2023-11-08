const mongoose = require('mongoose');
require('dotenv').config();
const Logger = require('../logger/logger');
async function connectToDatabase() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		Logger.info('Connected to MongoDB');
	} catch (error) {
		Logger.error('MongoDB connection error:', error);
	}
}

module.exports = connectToDatabase;

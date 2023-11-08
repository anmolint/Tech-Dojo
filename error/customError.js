class CustomError extends Error {
	constructor(code, message, statusCode) {
		super(message);
		this.name = this.constructor.name;
		this.statusCode = statusCode || 500;
		this.code = code || 'Unknown-Error';
	}
}
module.exports = CustomError;

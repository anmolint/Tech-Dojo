const {createLogger, format, transports} = require('winston');

const winstonLogger = createLogger({
	level: process.env.DEBUG === 'true' ? 'debug' : 'info',
	transports: [
		new transports.Console({
			format: format.simple(),
		}),
	],
	exitOnError: false,
});

function stringify(message) {
	const stringified = JSON.stringify(message);
	if (typeof message === 'object') {
		return stringified === '{}' ? `${message}` : stringified;
	}

	return message;
}

function debug(message, title) {
	winstonLogger.debug(templated(title, message));
}

function info(message, title) {
	winstonLogger.info(templated(title, message));
}

function error(message, title) {
	winstonLogger.error(templated(title, message));
}

function templated(title, message) {
	return `${title || ''}${stringify(message)}`;
}

function profile(id, message, level) {
	winstonLogger.profile(id, {
		message: `🔵 ${id} ${message || ''}`,
		level: level || 'debug',
	});
}

module.exports = {
	debug,
	info,
	error,
	profile,
};

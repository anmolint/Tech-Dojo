const {transports, format} = require('winston');
const expressWinston = require('express-winston');

const requestInfoLogger = expressWinston.logger({
	level: 'info',
	transports: [new transports.Console()],
	format: format.json(),
	meta: true,
	msg: 'HTTP {{req.method}} {{req.url}} {{req.id}} {{res.statusCode}}',
	expressFormat: true,
	colorize: true,
});

const requestErrorLogger = expressWinston.errorLogger({
	transports: [new transports.Console()],
	format: format.combine(format.colorize(), format.json()),
});

module.exports = {
	requestInfoLogger,
	requestErrorLogger,
};

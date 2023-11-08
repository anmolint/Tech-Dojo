const express = require('express');
const {Logger, LoggerMiddlewares} = require('./logger');
const connectToDatabase = require('./database/connection');
const errorHandler = require('./error/errorHandler');
const {usersRouter, booksRouter} = require('./routers');
const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by')
	.use(express.json())
	.use(LoggerMiddlewares.requestInfoLogger)
	.use('/users', usersRouter)
	.use('/books', booksRouter)
	.use(LoggerMiddlewares.requestErrorLogger)
	.use(errorHandler);

app.listen(port, async () => {
	await connectToDatabase();
	Logger.info(`Server is running on port ${port}`);
});

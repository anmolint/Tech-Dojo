const {Router} = require('express');
const {UserController} = require('../controllers');
const {validate} = require('../middlewares');
const {userValidator} = require('../validators');

const usersRouter = new Router();

usersRouter.post('/register', validate(userValidator), UserController.register);
usersRouter.post('/login', validate(userValidator), UserController.login);

module.exports = usersRouter;

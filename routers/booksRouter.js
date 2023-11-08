const {Router} = require('express');
const {BooksController} = require('../controllers');
const {validate, authenticate} = require('../middlewares');
const {booksValidator, editBooksValidator, idValidator} = require('../validators');

const booksRouter = new Router();
booksRouter.get('/', authenticate, BooksController.getBooks);
booksRouter.get('/:id', validate(idValidator), authenticate, BooksController.getBook);
booksRouter.post('/', validate(booksValidator), authenticate, BooksController.createBook);
booksRouter.put('/:id', validate(editBooksValidator), authenticate, BooksController.editBook);
booksRouter.delete('/:id', validate(idValidator), authenticate, BooksController.deleteBook);

module.exports = booksRouter;

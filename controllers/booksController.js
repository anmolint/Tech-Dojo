const {Books} = require('../database/models');
const CustomError = require('../error/customError');

const createBook = async (req, res, next) => {
	try {
		const {title, author, summary} = req.body;
		const bookExists = await Books.findOne({title, author});
		if (bookExists) {
			throw new CustomError('BOOK_ALREADY_EXISTS', 'Book Already Exists', 400);
		}

		const book = await Books.create({title, author, summary});
		res.status(201).json({
			success: true,
			book,
		});
	} catch (error) {
		next(error);
	}
};

const getBook = async (req, res, next) => {
	try {
		const {id} = req.params;
		const book = await Books.findById(id);
		if (!book || book.deleted) {
			throw new CustomError('BOOK_NOT_FOUND', 'Book Not Found', 404);
		}

		return res.status(200).json({
			success: true,
			book,
		});
	} catch (error) {
		next(error);
	}
};

const getBooks = async (req, res, next) => {
	try {
		const books = await Books.find({deleted: false}).select({deleted: 0});
		res.status(200).json({
			success: true,
			books,
		});
	} catch (error) {
		next(error);
	}
};

const editBook = async (req, res, next) => {
	try {
		const {id} = req.params;
		const {title, author, summary} = req.body;
		const book = await Books.findById(id);
		if (!book) {
			throw new CustomError('BOOK_NOT_FOUND', 'Book Not Found', 404);
		}

		book.title = title ?? book.title;
		book.author = author ?? book.author;
		book.summary = summary ?? book.summary;
		await book.save();
		res.status(200).json({
			success: true,
			book,
		});
	} catch (error) {
		next(error);
	}
};

const deleteBook = async (req, res, next) => {
	try {
		const {id} = req.params;
		const book = await Books.findById(id);
		if (!book) {
			throw new CustomError('BOOK_NOT_FOUND', 'Book Not Found', 404);
		}

		book.deleted = true;
		await book.save();
		res.status(200).json({
			success: true,
			message: 'Book Deleted Successfully',
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {createBook, getBook, editBook, getBooks, deleteBook};


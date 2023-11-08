const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	author: {
		type: String,
		required: true,
	},
	summary: {
		type: String,
		required: true,
	},
	deleted: {
		type: Boolean,
		default: false,
	},
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

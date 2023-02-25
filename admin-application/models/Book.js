const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  pagesNumber: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  loanPrice: {
    type: Number,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  pictureUrl: {
    type: String,
    required: true,
  },
  isNew: {
    type: Boolean,
    required: true,
  },
  lagerCount: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
  },
});

module.exports = Book = mongoose.model("book", BookSchema);

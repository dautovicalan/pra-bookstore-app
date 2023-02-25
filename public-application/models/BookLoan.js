const mongoose = require('mongoose');

const BookLoanSchema = new mongoose.Schema({
    userUid:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer"
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book"
    },
    loanDuration: {
        type: Number,
        required: true
    },
    loanDateStart: {
        type: Date,
        default: Date.now()
    },
    loanDateEnd: {
        type: Date,
        required: true
    },
    loanPrice:{
        type: Number,
        required: true
    },
    purchaseType: {
        type: String,
        required: true
    },
    bookReturned:{
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = BookLoan = mongoose.model("bookLoan", BookLoanSchema);
const mongoose = require('mongoose');

const BookStoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    postNumber: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    iban: {
        type: String,
        required: true
    },
    oib: {
        type: String,
        required: true
    },
})

module.exports = BookstoreInfo = mongoose.model("bookstoreinfo", BookStoreSchema);
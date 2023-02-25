const mongoose = require('mongoose');

const BookPurchaseSchema = new mongoose.Schema({
    userUid:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer"
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book"
    },    
    price: {
        type: Number,
        required: true
    },
    purchaseDate:{
        type: Date,
        default: Date.now()
    },
    purchaseType: {
        type: String,
        required: true
    }
});

module.exports = BookPurchase = mongoose.model("bookPurchase", BookPurchaseSchema);
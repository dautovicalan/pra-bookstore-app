const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({   
    userUid:{
        type: String,
        required: true,
        unique: true
    },
    streetAddress: {
        type: String,
        required: false
    },
    postNumber: {
        type: String,
        required: false
    },
    cityName: {
        type: String,
        required: false
    },
    bookStoreId:{
        type: String,
        required: true,
        unique: true
    }
});

module.exports = User = mongoose.model("customer", CustomerSchema);
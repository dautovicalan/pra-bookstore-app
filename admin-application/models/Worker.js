const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    workerUid: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = Worker = mongoose.model("worker", WorkerSchema);
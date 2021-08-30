const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    questionid: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('answer', AnswerSchema)
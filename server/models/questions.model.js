const mongoose = require('mongoose');


const QuestionSchema = new mongoose.Schema({
    question: {
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


module.exports = mongoose.model('question', QuestionSchema)
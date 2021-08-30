const mongoose = require('mongoose');

const MasterSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('master', MasterSchema)
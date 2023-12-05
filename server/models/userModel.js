const mongoose = require('mongoose')

// Define a Mongoose schema for your "courses" collection
const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    regdate: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('User', userSchema)
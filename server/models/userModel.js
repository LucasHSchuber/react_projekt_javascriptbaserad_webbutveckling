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
    hashed_password: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    regdate: {
        type: Date,
        required: true
    },
    token: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('User', userSchema)
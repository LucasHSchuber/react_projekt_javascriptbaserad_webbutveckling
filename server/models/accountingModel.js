const mongoose = require('mongoose')

// Define a Mongoose schema for your "courses" collection
const accountingSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    companyName: {
        type: String,
        required: false
    },
    comment: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        required: true
    },
    invoiceNmbr: {
        type: String,
        required: false
    },
    entries: [
        {
            plan: {
                type: String,
                required: true
            },
            credit: {
                type: Number,
                required: true
            },
            debit: {
                type: Number,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Accounting', accountingSchema)
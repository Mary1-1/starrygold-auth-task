const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bankSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    account_name: {
        type: String,
        default: ""
    },
    account_number: {
        type: String,
        default: ""
    },
    bank_name: {
        type: String,
        default: ""
    },
    bank_code: {
        type: String,
        default: ""
    },
    valid: {
        type: Boolean,
        default: false
    }
    },
    { timestamps: true 
})
module.exports = mongoose.model('Bank', bankSchema)
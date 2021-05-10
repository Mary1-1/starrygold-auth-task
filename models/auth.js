const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true},
    phoneNumber: { type: Number, required: true},
    password: { type: String, required: true},
    referalPhoneNumberOrPromoCode: { type: Number, required: true},
    heardAboutUs: { type: String, required: true},
    resetToken: String,
    resetTokenExpiration: Date
})

module.exports = mongoose.model('User', authSchema)

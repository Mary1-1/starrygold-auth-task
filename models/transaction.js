const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart'},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    transaction_ref: { type: String, default: ""},
    payment_ref: { type: String, default: ""},
    payment_method: { type: String, default: ""},
    amount: { type: Number, default: ""},
    status: { type: String, default: ""},
    serialized_response: { type: String, default: ""}
});

module.exports = mongoose.model('Transaction', transactionSchema);
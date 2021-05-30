const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    cart: {type: mongoose.Schema.Types.ObjectId, ref: 'Cart'},
    transaction: {type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Order', orderSchema);
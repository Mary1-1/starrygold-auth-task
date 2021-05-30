const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    cart: {type: mongoose.Schema.Types.ObjectId, ref: 'Cart'},
    transaction: {type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'},
    quantity: { type: Number, ref: 'Cart'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Order', orderSchema);
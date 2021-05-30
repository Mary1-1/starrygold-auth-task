const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1},
    amount: { type: Number, required: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Cart', cartSchema);
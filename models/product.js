const mongoose = require('mongoose');

/*const productSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: {type: String, required: true},
    productImage: { type: String, required: true }
});*/

const productSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: {type: String, required: true},
    productImage: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema)
const Cart = require("../models/cart");
const Product = require("../models/product");


exports.getAllCart = (req, res, next) => {
    Cart.find({ user: req.userData.userId }).then(data => {
      res.status(200).json({
        data: data
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}


exports.createCart = (req, res, next) => {
    const productid = req.body.product;
    Product.find({_id: productid, user: req.userData.userId}).then(carts => {
      if (!carts) {
        return res.status(404).json({
          message: "Product not found"
        })
      }
      const cart = new Cart({
        product: productid,
        quantity: req.body.quantity,
        amount: req.body.amount,
        user:  req.userData.userId
      })
      return cart.save()
    })
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: "Cart has been saved",
        data: result,
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}


exports.getOneCart = (req, res, next) => {
    Cart.findById(req.params.cartId).populate("product").then(cart => {
      if (!cart) {
        return res.status(404).json({
          message: "Cart not found"
        })
      }
      res.status(200).json({
        cart: cart
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}


exports.deleteCart = (req, res, next) => {
    const id = req.params.cartId
    Cart.findOneAndDelete({_id: id, user: req.userData.userId}).then(result => {
      res.status(200).json({
        message: "Cart have been deleted"
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}
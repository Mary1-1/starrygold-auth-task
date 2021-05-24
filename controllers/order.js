const Order = require("../models/order");
const Product = require("../models/product");


exports.getAllOrders = (req, res, next) => {
    Order.find({ user: req.userData.userId }).then(data => {
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


exports.createOrder = (req, res, next) => {
    const productid = req.body.product;
    Product.find({_id: productid, user: req.userData.userId}).then(orders => {
      console.log(orders);
      if (!orders) {
        return res.status(404).json({
          message: "Product not found"
        })
      }
      const order = new Order({
        product: productid,
        quantity: req.body.quantity,
        user:  req.userData.userId
      })
      return order.save()
    })
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: "Order has been created successfully",
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


exports.getOneOrder = (req, res, next) => {
    Order.findById(req.params.orderId).populate("product").then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        })
      }
      res.status(200).json({
        order: order
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}


exports.deleteOrder = (req, res, next) => {
    const id = req.params.orderId
    Order.findOneAndDelete({_id: id, user: req.userData.userId}).then(result => {
      res.status(200).json({
        message: "Order have been deleted"
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}
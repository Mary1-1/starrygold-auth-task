const mongoose = require('mongoose')
const Product = require('../models/product')
const path = require('path')


exports.getAllProducts = (req, res, next) => {
    Product.find({ user: req.userData.userId }).then(data => {
      res.status(200).json({
        data: data
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error occured in the database',
        error: err
      })
    })
}


exports.createProducts = (req, res, next) => {
    const product = new Product({
      user: req.userData.userId,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      productImage: req.file.location
      //productImage: req.file.path
    })
    return product.save().then(products => {
      res.status(201).json({
        message: "A product has been created",
        ProductCreated: {
          _id: products._id,
          name: products.name,
          price: products.price,
          description: products.description,
          image: products.productImage
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error occured in the database',
        error: err
      })
    })
}


exports.getOneProduct = (req, res, next) => {
    const id = req.params.productId
      Product.findById(id).select("name price _id description productImage").then(data => {
        if (data) {
          res.status(200).json({
            product: data
          })
        } else {
          res.status(404).json({
            message: "There is no valid productID"
          })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: 'Error occured in the database',
          error: err
        })
      })
}


exports.updateProduct = (req, res, next) => {
    const id = req.params.id;
    console.log(req.body)
    Product.findOneAndUpdate({_id: id, user: req.userData.userId}, {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      productImage: req.file.path
    }).exec().then(result => {
      res.status(200).json({
        message: "Product updated"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}


exports.deleteProduct = (req, res, next) => {
    const id = req.params.productId
    Product.findOneAndDelete({_id: id, user: req.userData.userId}).then(result => {
      res.status(200).json({
        message: "Product deleted"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}
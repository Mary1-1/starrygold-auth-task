const axios = require("axios");
const Order = require('../models/order')
const Transaction = require('../models/transaction')

const header_config = {
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK}`,
      "Content-type": "application/json",
  },
 };


exports.postTransaction = async (req, res, next) =>{
    try{
      const data = await axios.post("https://api.paystack.co/transaction/initialize",{
        email: req.body.email,
        amount: req.body.amount
      }, header_config)
      return res.status(200).json({
        data: data.data
      })
    } catch {
      return res.status(500).send({
        error: true,
        message: 'An error occured in the database'
      })
    }
}


  exports.verifyTransactions = async (req, res, next) =>{
      const data = await axios.get(`https://api.paystack.co/transaction/verify/${req.body.reference}`, header_config)
      console.log(data.data.data.status);
      if(data){
      /*if(data.data.data.status == "success"){
        const transaction = new Transaction({
          user: req.userData.userId,
          transaction_ref: transaction_ref,
          payment_ref: req.body.reference,
          payment_method: data.data.data.channel,
          amount: data.data.data.amount,
          status: data.data.data.status,
          serialized_response: serialized_response
        })
      transactions = await transaction.save()*/
      return res.status(200).json({
        message: 'Successful'
      })
      /*const order = new Order({
        user:  req.userData.userId,
        product: productid,
        cart: cartid,
        quantity: quantityid,
        transaction: transactionid,
      })
      orders = await order.save()
      return res.status(400).json({
        order: orders,
        error: true,
        message: 'Order has been made'
      })*/
      }
      return res.status(400).json({
        error: true,
        message: 'An error occured'
      })
  }

// exports.verifyTransactions = async (req, res, next) =>{
//   try{
//     //let transaction_ref = uniqid("SA|").toLocaleUpperCase();
//     let verify = await axios.get(`https://api.paystack.co/transaction/verify/${req.body.reference}`, header_config)
//     //const serialized_response = JSON.stringify(verify.data)
//     verify = verify.data.data
//     console.log(verify)
//     //const amount = parseFloat(verify.amount) / 100
//     //console.log(amount)
//     if (verify.status == "success") {
//       await Savings.findByIdAndUpdate(req.body.savings_id, {
//          $inc: {
//            balance: +amount,
//          },
//        });
//     }
//     const transaction = await Transactions.create({
//       /*user: req.current_user._id,
//       transaction_ref: transaction_ref,
//       payment_ref: req.body.reference,
//       payment_method: verify.channel,
//       category: "savings",
//       amount: amount,
//       status: verify.status,
//       savings_id: req.body.savings_id,
//       serialized_response: serialized_response*/
//     })
//     res.status(201).send({
//       error: false,
//       message: "Transaction completed successfully",
//       data: transaction
//     })
//   } catch {
//     return res.status(500).send({
//       error: true,
//       message: "something went wrong, could not create Transaction"
//     });
//   }
// }


  /*exports.createProducts = async (req, res, next) => {
    const categoryy = await Category.findById(req.body.category)
    if(!categoryy) return res.status(400).send('Invalid Category')
      const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        richDescription: req.body.richDescription,
        brand: req.body.brand,
        category: req.body.category,
        productImage: req.body.productImage,
        productImages: req.body.productImages,
        currentInStock: req.body.currentInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        dateCreated: req.body.dateCreated
      })
    products = await product.save()
    if(!products){
      return res.status(500).send('The product cannot be created')
    }
    res.send(products)
  }*/
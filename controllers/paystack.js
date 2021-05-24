const Banks = require('../models/paystack');
const axios = require("axios");

/*const headers: {
  Authorization: 'Bearer sk_test_3030c156b33e728ee26758afe5f74e018d481675'
  //Authorization: 'Bearer SECRET_KEY'
}*/


const header_config = {
   headers: {
     Authorization: `Bearer ${process.env.PAYSTACK}`,
     "Content-type": "application/json",
 },
};


//initialze transaction
exports.initialize_transaction = async (req, res) => {
  try {
    let data = {
      email: req.current_user.email,
      amount: req.body.amount * 100
    }
    const initialize = await axios.post("https://api.paystack.co/transaction/initialize", data, header_config);
      return res.status(200).send(initialize.data);
    } catch {
      return res.status(500).send({
        error: true,
        message: "something went wrong, transaction failed",
      })
    }
  }
  exports.verify_savings_transaction = async (req, res) => {
    try {
      let transaction_ref = uniqid("SA|").toLocaleUpperCase()
      console.log(header_config)
      let verify = await axios.get(`https://api.paystack.co/transaction/verify/${req.body.reference}`, header_config);
      const serialized_response = JSON.stringify(verify.data)
      verify = verify.data.data
      console.log(verify)
      const amount = parseFloat(verify.amount) / 100
      
      if (verify.status == "success") {
        await Savings.findByIdAndUpdate(req.body.savings_id, { $inc: { balance: +amount}})
      }
      const transaction = await Transactions.create({
        user: req.current_user._id,
        transaction_ref: transaction_ref,
        payment_ref: req.body.reference,
        payment_method: verify.channel,
        category: "savings",
        amount: amount,
        status: verify.status,
        savings_id: req.body.savings_id,
        serialized_response: serialized_response
      })
      res.status(201).send({
        error: false,
        message: "savings transaction completed successfully",
        data: transaction
     })
    } catch {
      return res.status(500).send({
        error: true,
        message: "something went wrong, could not create transaction",
      })
    }
  }

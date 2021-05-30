const Banks = require('../models/paystack');
const axios = require("axios");
const Bank = require('../models/paystack')
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


exports.getAllBanks = async (req, res, next) =>{
  try{
    const data = await axios.get("https://api.paystack.co/bank", header_config)
    return res.status(200).json({
      data: data.data
    })
  } catch {
    return res.status(500).send({
      error: true,
      message: 'An error occured'
    })
  }
}


exports.getUserBank = async (req, res, next) =>{
  try{
    const data = await axios.get(`https://api.paystack.co/bank/resolve?account_number=${req.body.account_number}&bank_code=${req.body.bank_code}`, header_config)
    console.log(data);
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

exports.postBvn = async (req, res, next) =>{
  try{
    const data = await axios.post("https://api.paystack.co/bvn/match",{
      bvn: req.body.bvn,
      account_number: req.body.account_number,
      bank_code: req.body.bank_code,
      first_name: req.body.first_name,
      last_name: req.body.last_name
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


exports.getUserBin = async (req, res, next) =>{
  try{
    const data = await axios.get(`https://api.paystack.co/decision/bin/${req.body.card_bin}`, header_config)
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
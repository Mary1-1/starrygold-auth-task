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

exports.getOneBank = async (req, res, next) =>{
  try{
    const data = await axios.get("https://api.paystack.co/bank/resolve?account_number=2209876820&bank_code=057", header_config)
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

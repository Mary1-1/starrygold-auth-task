const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox',
  client_id: 'ARrUQTtc7d01BerhSu5UD3x2HkTXkr5slRVdxSJYbdBMTYHqwmGXL_ikjP17teW0IY3c35sbOpRYsmpr',
  client_secret: 'EItHHKViiPM_pjmpq2keiescoEF_QiDpNGylOyfs0lq9kktGq0MhRxm76un_SxFhv6T1CyqC4bmKGUL8'
});

/*exports.makeTransaction = (req, res, next) =>{
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://localhost:3000/success",
            "cancel_url": "https://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": `${req.body.name}`,
                    "sku": `${req.body.sku}`,
                    "price": `${req.body.price}`,
                    "currency": `${req.body.currency}`,
                    "quantity": `${req.body.quantity}`
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "11"
            },
            "description": "just testing description here"
        }]
    }
    paypal.payment.create(create_payment_json, function(error, payment){
        if(error){
            throw error
        } else {
            console.log('create payment response');
            console.log(payment);
            //return res.status(200).json({
                //data: payment
            //})
            res.send(payment)
        }
    })
    var paymentId = req.query.paymentId;
    var payerId = { payer_id: req.query.PayerID };

paypal.payment.execute(paymentId, payerId, function(error, payment){
  if(error){
    console.error(JSON.stringify(error));
  } else {
    if (payment.state == 'approved'){
      console.log('payment completed successfully');
    } else {
      console.log('payment not successful');
    }
  }
});
}*/

/*exports.makeTransaction = async (req, res, next) =>{
    const payReq = JSON.stringify({
        intent:'sale',
        payer:{
          payment_method:'paypal'
        },
        redirect_urls:{
          return_url:'http://localhost:3000/process',
          cancel_url:'http://localhost:3000/cancel'
        },
        transactions:[{
          amount:{
            total:'10',
            currency:'USD'
          },
          description:'This is the payment transaction description.'
        }]
      });
    paypal.payment.create(payReq, function(error, payment){
        var links = {};
      
        if(error){
          console.error(JSON.stringify(error));
        } else {
          // Capture HATEOAS links
          payment.links.forEach(function(linkObj){
            links[linkObj.rel] = {
              href: linkObj.href,
              method: linkObj.method
            };
          })
      
          // If the redirect URL is present, redirect the customer to that URL
          if (links.hasOwnProperty('approval_url')){
            // Redirect the customer to links['approval_url'].href
          } else {
            console.error('no redirect URI present');
          }
        }
      });
}

exports.verifyTransaction = async (req, res, next) =>{
    var paymentId = req.query.paymentId;
var payerId = { payer_id: req.query.PayerID };

paypal.payment.execute(paymentId, payerId, function(error, payment){
  if(error){
    console.error(JSON.stringify(error));
  } else {
    if (payment.state == 'approved'){
      console.log('payment completed successfully');
    } else {
      console.log('payment not successful');
    }
  }
});
}*/
//Identity Token: yqpsZGfBz0ZEJ1vIW3AUdEZKCw54WT6M6CWa-96_sBeFOdjT1uujJgIiBlO
//paypal account miatechworks321@gmail.com
//client id : AX9MesVPB7ZWixh0RruCvsVKKtvo4RjrkonPUmcD_EvoTuvHJHynOowK3t3QtJMAYTNZ6rYImDUmsCq8
//secret: ECzTP6T0VGFhKniuVJhwM3DyJOWeT_EXWGxlFQ0LcNyFdV6bnr5H8AvkElc_sQDqO3yMFTNIhiFZgAjL
const header_config = {
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK}`,
      "Content-type": "application/json",
  },
 };

 exports.makeTransaction = async (req, res, next) =>{
  try{
    const data = await axios.post("https://api.sandbox.paypal.com/v2/payments/authorizations/7646456875656/capture")
    return res.status(200).json({
      data: data
    })
  } catch {
    return res.status(500).send({
      error: true,
      message: 'An error occured in the database'
    })
  }
}
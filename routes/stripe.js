const express = require("express")
const router = express.Router()

const stripeCtrl = require('../controllers/stripe')


//router.get("/api/stripe", stripeCtrl.getStripe)

router.post("/api/stripe", stripeCtrl.createNewCustomer)

router.post("/api/newcard", stripeCtrl.createCustomerCard)

router.get("/api/newcard", stripeCtrl.getAllCards)

router.post("/api/updatecard", stripeCtrl.updateCard)

router.post("/api/deletecard", stripeCtrl.deleteCard)

router.post("/api/payment", stripeCtrl.makePayment)

router.delete("/api/deletecard", stripeCtrl.deleteCard)

//router.post("/v1/payment_methods", stripeCtrl.postStripeHome)

module.exports = router
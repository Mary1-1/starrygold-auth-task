const express = require("express")
const router = express.Router()

const userAuth = require('../middleware/userAuth')
const paypalCtrl = require('../controllers/paypal')


router.post("/users/paypal", paypalCtrl.makeTransaction)


/*router.post("/users/banks/one",  bankCtrl.getUserBank)

router.post("/users/banks/bvn", bankCtrl.postBvn)

router.post("/users/banks/bin",  bankCtrl.getUserBin)*/



module.exports = router
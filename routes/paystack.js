const express = require("express")
const router = express.Router()

//const orderCtrl = require('../controllers/order')
const userAuth = require('../middleware/userAuth')
const bankCtrl = require('../controllers/paystack')


router.get("/users/banks", bankCtrl.getAllBanks)

router.post("/users/banks/one",  bankCtrl.getUserBank)

router.post("/users/banks/bvn", bankCtrl.postBvn)

router.post("/users/banks/bin", userAuth, bankCtrl.getUserBin)



module.exports = router
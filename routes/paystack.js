const express = require("express")
const router = express.Router()

const orderCtrl = require('../controllers/order')
const userAuth = require('../middleware/userAuth')
const bankCtrl = require('../controllers/paystack')


router.get("/users/banks", userAuth, bankCtrl.getAllBanks)

router.get("/users/banks/one", userAuth, bankCtrl.getOneBank)



module.exports = router
const express = require("express")
const router = express.Router()

const userAuth = require('../middleware/userAuth')
const transactionCtrl = require('../controllers/transanction')

router.post("/users/transaction",  userAuth, transactionCtrl.postTransaction)

router.post("/users/transaction/verify",  userAuth, transactionCtrl.verifyTransactions)

module.exports = router
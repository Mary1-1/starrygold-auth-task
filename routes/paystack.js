const express = require("express")
const router = express.Router()

const orderCtrl = require('../controllers/order')
const userAuth = require('../middleware/userAuth')


router.get("/users/banks", userAuth, orderCtrl.getAllOrders)

router.post("/users/banks", userAuth, orderCtrl.createOrder)


module.exports = router
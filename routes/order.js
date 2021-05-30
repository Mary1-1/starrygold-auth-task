const express = require("express")
const router = express.Router()

const orderCtrl = require('../controllers/order')
const userAuth = require('../middleware/userAuth')


router.get("/", orderCtrl.getAllOrder)

router.post("/", orderCtrl.createOrder)

router.get("/:orderId", orderCtrl.getOneOrder)

router.delete("/:orderId", orderCtrl.deleteOrder)

module.exports = router
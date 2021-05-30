const express = require("express")
const router = express.Router()

const cartCtrl = require('../controllers/cart')
const userAuth = require('../middleware/userAuth')


router.get("/", userAuth, cartCtrl.getAllCart)

router.post("/", userAuth, cartCtrl.createCart)  

router.get("/:cartId", userAuth, cartCtrl.getOneCart)

router.delete("/:cartId", userAuth, cartCtrl.deleteCart)

module.exports = router
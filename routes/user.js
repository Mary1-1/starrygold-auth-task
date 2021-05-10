const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')
const isAuth = require('../middleware/userAuth')

router.get('/:userId', isAuth, userCtrl.getUser)


module.exports = router
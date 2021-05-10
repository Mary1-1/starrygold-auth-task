const express = require('express')
const router = express.Router()

const authCtrl = require('../controllers/auth')

router.post('/signin', authCtrl.signUserIn)
router.post('/signup', authCtrl.createUser)

module.exports = router
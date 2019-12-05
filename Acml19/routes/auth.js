const express = require('express')
const router = express.Router()
const validator = require('../validations/post')

const authController = require('../controllers/auth')

 
router.post('/signup',validator.userSignupValidator,authController.signup)

router.post('/signin',authController.signin)

    module.exports =router ;  
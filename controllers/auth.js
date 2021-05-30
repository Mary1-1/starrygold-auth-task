const User = require('../models/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.createUser = (req, res, next) =>{
    User.findOne({email: req.body.email}).then(exits =>{
        if(exits){
            return res.status(409).json({
                message: 'Email already exits'
            })
        } else{
            bcrypt.hash(req.body.password, 12, (err, hashedPassword) =>{
                if(err){
                    return res.status().json({
                        message: 'Error occured while hashing password'
                    })
                } else{
                    //console.log(req.files['image'][0])
                    console.log(req.files)
                    const user = new User({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        phoneNumber: req.body.phoneNumber,
                        password: hashedPassword,
                        image: req.files['image'][0].location,
                        profilePicture: req.files['image'][0].location,
                        // image: req.files['image][0],
                        // profilePicture: req.files['image][0],
                        referalPhoneNumberOrPromoCode: req.body.referalPhoneNumberOrPromoCode,
                        heardAboutUs: req.body.heardAboutUs
                    })
                    user.save().then(result =>{
                        const token = jwt.sign({email: user.email, userId: user._id}, process.env.JWT_KEY)
                            //{expiresIn: "1h"}
                            return res.status(200).json({
                                message: "User signed up successfully",
                                user: user,
                                userToken: token
                            })
                    }).catch(err =>{
                        res.status(200).json({
                            message: 'Cant sign user up'
                        })
                    })
                }
            })
        }
    }).catch()
}


exports.signUserIn = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid email or password"
                })
            } if (result) {
                //const token = jwt.sign({email: user.email, userId: user._id}, process.env.JWT_KEY, {expiresIn: "1h"})
                const token = jwt.sign({email: user.email, userId: user._id}, process.env.JWT_KEY)
                return res.status(200).json({
                    message: "User signed in successfully",
                    user: user,
                    userToken: token
                })
            }
            res.status(401).json({
                message: "Error in signing user in"
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error occured in the database',
            error: err
        })
    })
}




/*exports.signUserIn = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid email or password"
                })
            } if (result) {
                const token = jwt.sign({email: user.email, userId: user._id}, process.env.JWT_KEY, {expiresIn: "1h"})
                return res.status(200).json({
                    message: "User signed in successfully",
                    user: user,
                    userToken: token
                })
            }
            res.status(401).json({
                message: "Error in signing user in"
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error occured in the database',
            error: err
        })
    })
}*/
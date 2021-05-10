const User = require('../models/auth')


exports.getUser = (req, res, next) =>{
    const id = req.params.userId
    User.findById(id).then(user =>{
        if(!user){
            res.status().json({
                message: 'Invalid User'
            })
        } else {
            res.status(200).json({
                user: user
            })
        }
    }).catch(err =>{
        res.status(500).json({
            message: 'Error occured in the database'
        })
    })
}
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const User = require('../models/user');


exports.loginUser = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Auth field'
                })

            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth field'
                    })
                }
                if (result) {

                    const token = jwt.sign({
                        email: user.email,
                        userID: user.__v

                    }, "" + process.env.JWT_KEY, {
                        expiresIn: '1h'
                    })
                    return res.status(200).json({
                        message: 'auth successful',
                        token: token
                    })
                }

                res.status(401).json({
                    message: 'Auth field'
                })

            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}


exports.deleteUser = (req, res, next) => {
    User.remove({ _id: req.params.userID })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: ' user deleted'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}


exports.signupUser = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                res.status(409).json({
                    message: 'Mail exist'
                })

            } else {

                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err

                        });
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash

                        })

                        user.save().then(
                            result => {
                                console.log(result)
                                res.status(201).json({
                                    message: 'user created'
                                })
                            }
                        ).catch(err => {
                            console.log(err)
                            res.status(500).json({
                                error: err
                            })
                        })
                    }
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

}
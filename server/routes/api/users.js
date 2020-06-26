const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router();
const checkAuth = require('./middleware/check-auth')
const User = require('../api/models/user');
const userController = require('./controllers/users')
router.post('/signup', userController.signupUser)


router.post('/login', userController.loginUser)

router.delete('/:userID', checkAuth, userController.deleteUser)


module.exports = router
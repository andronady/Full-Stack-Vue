const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization
        console.log(token)
        const decode = jwt.verify(token, "" + process.env.JWT_KET)
        req.userData = decode
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            message: 'auth field'
        })
    }


}
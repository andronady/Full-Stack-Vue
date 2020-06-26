const express = require('express')
const mongoose = require('mongoose')

const multer = require('multer')

const checkAuth = require('./middleware/check-auth')


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/JPG') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})
const router = express.Router();


const Product = require('../api/models/product');
const productController = require('./controllers/products')


router.get('/', productController.get_all_products)
router.post('/', checkAuth, upload.single('productImage'), productController.add_product)

router.get('/:productID', productController.get_product_by_id)


router.patch('/:productID', checkAuth, productController.update_product)

router.delete('/:productID', checkAuth, productController.delete_product)



module.exports = router
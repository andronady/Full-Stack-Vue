const express = require('express')
const mongoose = require('mongoose')

const multer = require('multer')

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

router.get('/', (req, res, next) => {

    Product.find().select('name price').exec().then(data => {
        console.log(data)
        const response = {
            count: data.length,
            data: data.map(data => {
                return {
                    name: data.name,
                    price: data.price,
                    id: data._id,
                    productImage: data.productImage,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:9000/api/products/' + data._id
                    }
                }
            })
        }
        res.status(200).json({ response })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })

})


router.get('/:productID', (req, res, next) => {
    const id = req.params.productID

    Product.findById(id).exec().then(data => {
        console.log(data)
        res.status(200).json(data)
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    })

})

router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID

    Product.update({ _id: id }, { $set: { name: req.body.name, price: req.body.price } })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        }).catch(err => console.log(err))


})

router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID
    Product.remove({ _id: id }).exec().then(result => {
        res.status(200).json(result)
    }).catch(err => console.log(err))


})

router.post('/', upload.single('productImage'), (req, res, next) => {

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    })
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'created successfully',
            data: result
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })

})

module.exports = router
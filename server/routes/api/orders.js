const express = require('express')
const mongoose = require('mongoose')

const router = express.Router();

const Order = require('../api/models/order');
const { populate } = require('../api/models/order');

router.get('/', (req, res, next) => {

    Order.find()
        .populate('product')
        .exec()
        .then(data => {
            console.log(data)
            res.status(200).json({
                count: data.length,
                data: data.map(data => {
                    return {
                        id: data._id,
                        product: data.product,
                        quantity: data.quantity,
                        type: "GET",
                        url: "http://localhost:9000/api/orders/" + data._id
                    }
                })
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

})


router.get('/:orderID', (req, res, next) => {
    const id = req.params.orderID
    Order.findById(id)
        .populate('product')
        .exec()
        .then(data => {
            console.log(data)
            res.status(200).json(data)
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.patch('/:orderID', (req, res, next) => {
    const id = req.params.orderID
    Order.update({ _id: id }, { $set: { quantity: req.body.quantity, product: req.body.productID } })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        }).catch(err => console.log(err))


})

router.delete('/:orderID', (req, res, next) => {
    const id = req.params.orderID
    Order.remove({ _id: id })
        .exec()
        .then(data => {
            console.log(data)
            res.status(200).json(data)
        })
        .catch(err => console.log(err))

})

router.post('/', (req, res, next) => {
    const order = new Order({
        quantity: req.body.quantity,
        product: req.body.productID
    })
    order.save().then(data => {
        console.log(data)
        res.status(201).json({
            message: 'POST request to order',
            data: data
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err

        })
    })

})

module.exports = router
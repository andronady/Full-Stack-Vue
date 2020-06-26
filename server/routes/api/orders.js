const express = require('express')
const mongoose = require('mongoose')

const router = express.Router();

const Order = require('../api/models/order');
const { populate } = require('../api/models/order');
const checkAuth = require('./middleware/check-auth')

const orderController = require('./controllers/orders')


router.get('/', checkAuth, orderController.get_all_order)


router.get('/:orderID', checkAuth, orderController.get_order_By_id)

router.patch('/:orderID', checkAuth, orderController.update_order)

router.delete('/:orderID', checkAuth, orderController.delete_order)

router.post('/', checkAuth, orderController.create_order)

module.exports = router
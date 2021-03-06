const mongoose = require('mongoose')

const ordersSchema = mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    quantity: { type: Number, default: 1 }
})

module.exports = mongoose.model('order', ordersSchema)
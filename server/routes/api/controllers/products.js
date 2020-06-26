const Product = require('../models/product');


exports.get_all_products = (req, res, next) => {

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

}


exports.get_product_by_id = (req, res, next) => {
    const id = req.params.productID

    Product.findById(id).exec().then(data => {
        console.log(data)
        res.status(200).json(data)
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    })

}

exports.update_product = (req, res, next) => {
    const id = req.params.productID

    Product.update({ _id: id }, { $set: { name: req.body.name, price: req.body.price } })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        }).catch(err => console.log(err))


}

exports.delete_product = (req, res, next) => {
    const id = req.params.productID
    Product.remove({ _id: id }).exec().then(result => {
        res.status(200).json(result)
    }).catch(err => console.log(err))


}

exports.add_product = (req, res, next) => {

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

}
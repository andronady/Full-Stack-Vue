const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

// app.use((req, res, next) => {
//     const error = new Error('Not found')
//     error.status = 404;
//     next(error)
// })
// app.use((error, req, res, next) => {
//     res.status(error.status || 500)
//     res.json({
//         error: {
//             message: error.message
//         }
//     })
// })

mongoose.connect('mongodb+srv://andrew:asdasdasd@posts-z6ced.mongodb.net/shop?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});

mongoose.Promise = global.Promise
const posts = require('./routes/api/posts');
app.use('/api/posts', posts)


const orders = require('./routes/api/orders');
const products = require('./routes/api/products');
const userRoute = require('./routes/api/users');


app.use('/api/orders', orders)
app.use('/api/products', products)
app.use('/api/users', userRoute)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'));

    app.get(/.*/, (res, req) => res.sendFile(__dirname + 'public/index.html'));
}

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`server started on porst ${port}`))
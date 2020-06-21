const express = require('express')

const mongodb = require('mongodb')

const router = express.Router();







// mongoose.connect('mongodb+srv://andrew:asdasdasd@posts-z6ced.mongodb.net/posts?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
//     if (err) {
//         console.log('Unable to connect to the server. Please start the server. Error:', err);
//     } else {
//         console.log('Connected to Server successfully!');
//     }
// });

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://andrew:asdasdasd@posts-z6ced.mongodb.net/posts?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
    return client.db('posts').collection('posts')
}



//GET posts 

router.get('/', async(req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray())
})

// ADD post

router.post('/', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    res.status(201).send()
})

// DELETE post

router.delete('/:id', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
    res.status(201).send();

})




module.exports = router
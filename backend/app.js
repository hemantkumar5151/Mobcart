const express = require('express');
const app = express();
const products = require('./data/products');
app.get('/',(req,res) => {
    res.send('<h1>Server is running...</h1>')
})


app.get('/api/products/',(req,res) => {
    res.json(products)
})
app.get('/api/products/:id',(req,res) => {
    const product = products.find(product => product._id = req.params.id)
    res.json(product)
})

module.exports = app;






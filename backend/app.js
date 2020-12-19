const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');
const uploadRouter = require('./routes/upload');

app.use(express.json());
app.use(morgan('dev'));

app.use('/uploads',express.static(path.join(__dirname, '/uploads')))


// app.get('/',(req,res) => {
//     res.send('<h1>Server is running...</h1>')
// })


app.use('/api/user',userRouter);
app.use('/api/product', productRouter);
app.use('/api/order',orderRouter);
app.use('/api/upload',uploadRouter);

app.get('/api/config/paypal',(req,res)  => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})
module.exports = app;






const mongoose = require('mongoose');
const reviewSchema = require('./review');

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, 'Please enter the product name'],
    },
    image: {
        type: String,
        required: [true, 'Please add the image of product']
    },
    brand: {
        type: String,
        required: [true, 'Please enter the brand of the product'],
    },
    category: {
        type: String,
        required: [true, 'Please enter category of the product ']
    },
    description: {
        type: String,
        required: [true, 'Please enter the description of the product'],
        trim: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: [true, 'Please enter the rating of product'],
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, 'Please enter the price of product'],
        default: 0,
    },
    countInStock: {
        type: Number,
        required: [true, 'Please enter the stock of the product'],
        default: 0,
    },
}, {
    timestamps: true
})


const Product = mongoose.model('Product', productSchema);

module.exports = Product;

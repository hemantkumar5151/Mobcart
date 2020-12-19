const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the user name']
    },
    rating: {
        type: Number,
        required: [true, 'Please enter the rating']
    },
    comment: {
        type: String,
        required: [true, 'Please enter the comment']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Please enter user name'],
        ref: 'User'
    },
}, {
    timestamps: true
} )

// const Review = mongoose.model('Review', reviewSchema);

module.exports = reviewSchema;
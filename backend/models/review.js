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
    }
}, {
    timestamps: true
} )

// const Review = mongoose.model('Review', reviewSchema);

module.exports = reviewSchema;
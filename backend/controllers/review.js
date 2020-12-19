const asyncHandler = require('express-async-handler');
const Product = require('../models/product');
exports.createReview = asyncHandler(async(req,res) => {
    if(req.user.isAdmin) {
        return res.status(400).json({
            status: 'fail',
            message: 'Admin could not create review to its own product',
            data: null
        })
    } else {
        const { rating, comment } = req.body;

        const product = await Product.findById(req.params.id);
        if(product) {
            const alreadyReviewed =  product.reviews.find(exp => exp.user.toString() === req.user._id.toString());

            if(alreadyReviewed) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Review already added by you',
                })
            }

            const review = {
                name: req.user.name,
                comment,
                rating: Number(rating),
                user: req.user._id
            }

            product.reviews.push(review);

            product.numReviews = product.reviews.length;

            product.rating = product.reviews.reduce((acc, item) => item.rating + acc ,0) / product.reviews.length;

            await product.save();

            return res.status(201).json({
                status: 'ok',
                message: 'review added',
                data : review
            })

        } else {
            return res.status(404).json({
                status: 'fail',
                message: 'product not found',
                data: null
            })
        }
    }

})
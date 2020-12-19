const Product = require('../models/product');

const asyncHandler = require('express-async-handler');

exports.createProduct = asyncHandler(async(req,res) => {
    console.log(req.body)
    const product = await Product.create({
        user: req.user._id,
        ...req.body
    });
    return res.status(201).json({
        status: 'ok',
        message: 'Product created successfully',
        data: product
    })
})
exports.updateProduct = asyncHandler(async(req,res) => {
    const { name, price, description, image, countInStock, } = req.body
    const product = await Product.findById(req.params.id);
    if(!product) {
        return res.status(404).json({
            status: 'fail',
            message: 'No product no found',
            data: null
        })
    }

    product.name = name ? name : product.name
    product.price = price ? price : product.price
    product.description = description ? description : product.description;
    product.image = image ? image : product.image;
    product.countInStock = countInStock ? countInStock : product.countInStock;

    await product.save();

    return res.status(200).json({
        status: 'ok',
        message: 'Updated successfully ',
        data: product
    })
})

exports.getAllProduct = asyncHandler(async(req,res) => {

    const pageSize = 4;

    const page = Number(req.query.pageNumber) || 1;


    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const counts = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));
    if(products.length === 0) {
        return res.status(404).json({
            status: 'fail',
            message: 'No product found',
            data: null
        })
    }
    return res.status(200).json({
        status: 'ok',
        message: 'All Products',
        data: products,
        page,
        pages: Math.ceil(counts / pageSize)
    })
})
exports.getSingleProduct = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        return res.status(404).json({
            status: 'fail',
            message: 'No product found',
            data: null
        })
    }
    return res.status(200).json({
        status: 'ok',
        message: 'Product is found',
        data: product
    })
})
exports.allProductsBelongToSpecific = asyncHandler(async(req,res) => {

    const products = await Product.find({ user: req.user._id});
    if(products.length === 0) {
        return res.status(404).json({
            status: 'fail',
            message: 'No product found',
            data: null
        })
    }
    return res.status(200).json({
        status: 'ok',
        message: 'All Products',
        data: products
    })

})
exports.deleteProduct = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(404).json({
            status: 'fail',
            message: 'Product not found',
            data: null
        })
    }

    await product.delete();
    return res.status(200).json({
        status: 'ok',
        message: 'Product delete successfully',
        data: null
    })
})

exports.topProduct = asyncHandler(async(req,res) => {

    const products = await Product.find().sort({ rating: -1}).limit(3);
    if(products.length === 0) {
        return res.status(404).json({
            status: 'fail',
            message: 'No product found',
            data: null
        })
    }

    return res.status(200).json({
        status: 'ok',
        message: 'All Products',
        data: products,
    })
})
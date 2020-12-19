const Order = require('../models/order');
const catchAsync = require('express-async-handler');

exports.createOrder = catchAsync(async(req,res) => {

    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;
    if(orderItems && orderItems.length === 0 ) {
        return res.status(400).json({
            status: 'fail',
            message: 'No order items'
        })
    } else {
        const order =  new Order({ 
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })

        const createdOrder = await order.save();

        return res.status(201).json({
            status: 'ok',
            message: 'Order created successfully',
            data: createdOrder
        })
    }
})


exports.singleOrder = catchAsync(async(req,res) => {
    const order = await (await Order.findById(req.params.id).populate('user', 'name email')).execPopulate();
    if(!order) {
        return res.status(400).json({
            status: 'fail',
            message: 'No order found with the above Id',
            data: null
        })
    }
    return res.status(200).json({
        status: 'ok',
        message: 'Order found',
        data: order
    })
})


exports.orderUpdateToPaid = catchAsync(async(req,res) => {
    const order = await Order.findById(req.params.id);
    if(order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        
        const updatedOrder = await order.save();
        return res.status(200).json({
            status: 'ok',
            message: 'Payment successful',
            data: updatedOrder
        })
    } else {
        return res.status(404).json({
            status: 'fail',
            message: 'No order found with this Id',
        })
    }
})

exports.orderBelongToSpecificUser = catchAsync(async(req,res) => {
    console.log(req.user)
    const order = await Order.find({user: req.user._id})
    if(!order) {
        return res.status(400).json({
            status: 'fail',
            message: 'No order found with the above Id',
            data: null
        })
    }
    return res.status(200).json({
        status: 'ok',
        message: 'Order found',
        data: order
    })
})

exports.orderReceivedByAdmin = catchAsync(async(req,res) => {
    const orders = await Order.find({}).populate('user', 'id name')


    res.status(200).json({
        status: 'ok',
        message: 'Order received by you', 
        data: orders
    })
})


exports.orderUpdateToDeliver = catchAsync(async(req,res) => {
    const order = await Order.findById(req.params.id);
    if(order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        
        const updatedOrder = await order.save();
        return res.status(200).json({
            status: 'ok',
            message: 'Payment successful',
            data: updatedOrder
        })
    } else {
        return res.status(404).json({
            status: 'fail',
            message: 'No order found with this Id',
        })
    }
})

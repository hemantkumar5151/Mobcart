const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});
const User = require('../models/user');

const asyncHandler = require('express-async-handler');
const generateToken = id => jwt.sign({ id }, `${process.env.JWT_SECRET}`)

exports.createUser = asyncHandler(async(req,res) => {
    
    
    const isExist = await User.findOne({ email : req.body.email});
    if(isExist) {
        return res.status(400).json({
            status: 'fail',
            message: 'User already exist',
            data: null
        })
    } 
    const user = await User.create(req.body);
    const token =  generateToken(user._id);

    const data = {
        token,
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }
    return res.status(201).json({
        status: 'ok',
        message: 'Account created successfully',
        data
    })
})

exports.login = asyncHandler(async(req,res,next) => {
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({
        status: 'fail',
        message: 'Please enter the email and password',
        data: null
    })
    const user = await User.findOne({ email });
    if(!user) return res.status(401).json({
        status: 'fail',
        message: 'No user found with this email id',
        data: null
    })

    if(user.password !== password) {
        return res.status(401).json({
            status: 'fail',
            message: 'email or password is incorrect',
            data: null
        })
    }
    const token =  generateToken(user._id);
    const data = {
        token,
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }
    return res.status(200).json({
        status: 'ok',
        message: 'Login successfully',
        data,
    })
})

exports.protect = asyncHandler(async(req,res,next) => {
    let token;
    console.log(req.headers)
    if(!req.headers.authorization && !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({
            status: 'fail',
            message: 'You are not login.',
            data: null
        })
    }
    token = req.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, `${process.env.JWT_SECRET}`,(err, data) => {
        if(err) return res.status(401).json({
            status: 'fail',
            message: err.message
        })
        return data;
    })
    const user = await User.findById(decoded.id);
    if(!user) {
        return res.status(401).json({
            status: 'fail',
            message: 'User no longer exist',
            data: null
        })
    }
    req.user = user;
    next()
})

exports.isAdmin = (req,res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(401).json({
            status: 'fail',
            message: 'You are not authorized',
        });
    }
}

exports.profile = asyncHandler(async(req,res) => {  
    return res.status(200).json({
        status: 'ok', 
        message: 'Welcome '  + req.user.name,
        data: req.user
    })
})

exports.updateMe = asyncHandler(async(req,res) => {
    const {name , email, password} = req.body;
    req.user.name = name  ? name : req.user.name;
    req.user.email = email ? email : req.user.email;
    req.user.password = password ? password : req.user.password;

    await req.user.save();

    const data = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
    }
    return res.status(200).json({
        status: 'ok',
        message: 'Updated successfully ' + req.user.name,
        data
    })
})

exports.allUser = asyncHandler(async(req,res) => {
    const users = await User.find();
    if(users.length === 0) {
        return res.status(404).json({
            status: 'ok',
            message: 'No user found',
            data: null
        })
    };
    return res.status(200).json({
        status: 'ok',
        message: 'User list',
        data: users
    })
})

exports.deleteUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        return res.status(400).json({
            status: 'fail',
            message: 'No user found',
            data: null
        })
    }

    await user.remove();
    return res.status(200).json({
        status: 'ok',
        message: 'Delete successfully',
        data: null
    })
})

exports.singleUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id).select('-password');
    if(!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'No user found',
            data: null
        })
    }
    return res.status(200).json({
        status: 'ok',
        message: 'User found',
        data: user
    })
})


exports.updateUserByAdmin = asyncHandler(async(req,res) => {
    const { name , email, isAdmin} = req.body;
    const user = await User.findById(req.params.id);
    if(!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'No user found',
            data: null
        })
    }
    
        user.name = name ? name : user.name;
        user.email = email ? email : user.email
        user.isAdmin  = isAdmin
        
        await user.save();

        return res.status(200).json({
            status: 'ok',
            message: 'User updated successfully',
            data: user
        })
})
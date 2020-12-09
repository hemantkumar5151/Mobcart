const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name']
    },
    email: {
        type: String,
        required: [true, 'Please enter the email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter the password'],
        trim: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

const User = require('User', userSchema);

module.exports = User;
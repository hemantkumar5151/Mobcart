const { model } = require('mongoose');

const route = require('express').Router();

const {  createUser, login, profile, protect, updateMe, isAdmin, allUser, deleteUser, singleUser, updateUserByAdmin } = require('../controllers/user');

route.post('/register',createUser);
route.post('/login',login);
route.route('/profile')
    .get(protect, profile)
    .patch(protect, updateMe);
    
route.get('/', protect, isAdmin, allUser);

route.route('/:id')
    .delete(protect, isAdmin, deleteUser)
    .get(protect, isAdmin, singleUser)
    .patch(protect, isAdmin, updateUserByAdmin)

module.exports = route;
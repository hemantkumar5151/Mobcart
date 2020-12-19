const route = require('express').Router();
const {  createProduct, getAllProduct, getSingleProduct, allProductsBelongToSpecific, deleteProduct, updateProduct, topProduct } = require('../controllers/product');
const { createReview } = require('../controllers/review');
const { protect, isAdmin,  } = require('../controllers/user');

route.get('/',getAllProduct);
route.route('/top').get(topProduct)
route.route('/:id').get(getSingleProduct)

route.route('/:id/review').post(protect,createReview);

route.route('/admin/product')
    .get(protect, isAdmin, allProductsBelongToSpecific)
    .post(protect, isAdmin, createProduct);

route.route('/admin/product/:id')
    .patch(protect, isAdmin, updateProduct)
    .delete(protect, isAdmin, deleteProduct);


module.exports = route;
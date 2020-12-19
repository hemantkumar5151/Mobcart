const route = require('express').Router();
const { createOrder, singleOrder, orderUpdateToPaid, orderBelongToSpecificUser, orderReceivedByAdmin, orderUpdateToDeliver } = require('../controllers/order');
const { protect, isAdmin } = require('../controllers/user')

route.get('/myorder',protect, orderBelongToSpecificUser);
route.route('/').post(protect,createOrder).get(protect, isAdmin, orderReceivedByAdmin)
route.get('/:id',protect,singleOrder)
route.patch('/:id/pay',protect,orderUpdateToPaid)
route.patch('/:id/deliver',protect,orderUpdateToDeliver)

module.exports = route;
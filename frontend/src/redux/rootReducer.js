import { combineReducers } from 'redux';
import { productCreateReducer, productListReducer, productDetailReducer,productDeleteReducer, productUpdateReducer,productReviewReducer,topProductReducer  } from "./product/reducer";
import { cartReducer } from '../redux/cart/reducer';
import { userReducer, userDetailReducer, userListReducer, userDeleteReducer, userUpdateReducer } from '../redux/user/reducer';
import { orderReducer, orderDetailReducer, orderPayReducer, orderListReducer ,orderDeliverReducer} from '../redux/order/reducer';
const rootReducer = combineReducers({
    productCreateReducer,
    productListReducer,
    productDetailReducer,
    productDeleteReducer,
    productReviewReducer,
    productUpdateReducer,
    topProductReducer,
    cartReducer,
    userReducer,
    userDetailReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
    orderReducer,
    orderDetailReducer,
    orderPayReducer,
    orderListReducer,
    orderDeliverReducer,
})

export default rootReducer;
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutStep';
import Message from '../components/Message';
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { createOrder } from '../redux/order/actionCreator';
import Loader from '../components/Loader';
const PlaceOrderScreen = ({ history}) => {
    const cartReducer = useSelector(state => state.cartReducer);
    const orderReducer = useSelector(state => state.orderReducer)
    
    cartReducer.itemsPrice = cartReducer.cartItems.reduce((acc , item) => acc + (item.qty * item.price),0)
    cartReducer.shippingPrice = cartReducer.itemsPrice > 100 ? 0 : 100
    cartReducer.taxPrice = Number((0.15 * cartReducer.itemsPrice).toFixed(2));
    cartReducer.totalPrice = Number(cartReducer.itemsPrice + cartReducer.shippingPrice + cartReducer.taxPrice).toFixed(2)
    
    const dispatch = useDispatch();
    const { order, isLoading, errorMessage} = orderReducer;
    useEffect(() => {
        if(order) {
            history.push(`/order/${order._id}`)
        }
    },[history, order])
    const placeOrderHandler = () => {
        dispatch(createOrder({ 
            orderItems: cartReducer.cartItems,
            shippingAddress: cartReducer.shippingAddress,
            paymentMethod: cartReducer.paymentMethod,
            itemsPrice: cartReducer.itemsPrice,
            taxPrice: cartReducer.taxPrice,
            shippingPrice: cartReducer.shippingPrice,
            totalPrice: cartReducer.totalPrice,
        }))
    }
    return (
        <>
             {
                isLoading ? <Loader /> : errorMessage ? <Message  text={errorMessage}/> :    <> <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                    {cartReducer.shippingAddress.address},{cartReducer.shippingAddress.city},
                                    {cartReducer.shippingAddress.postalCode}, {cartReducer.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {
                                cartReducer.paymentMethod
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {
                                cartReducer.cartItems.length === 0 ? <Message text="Your cart is empty" />
                                : <ListGroup variant="flush">
                                        {cartReducer.cartItems.map((item, index) => <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link className="text-secondary text-decoration-none"  to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} * $ {item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>)}
                                </ListGroup>
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>    
                <Col md={4}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${cartReducer.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${cartReducer.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${cartReducer.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${cartReducer.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button type="button" className="btn btn-block" variant="dark" disabled={cartReducer.cartItems.length === 0} onClick={placeOrderHandler}>
                                        Place Order
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                </Col>
            </Row>  
            </> 
}
        </>
    )
}

export default PlaceOrderScreen;

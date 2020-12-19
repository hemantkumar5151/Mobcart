import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {  Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { orderDetail , orderUpdateToPaid,  orderUpdateToDeliver,} from '../redux/order/actionCreator';
import Axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
const OrderScreen = ({ match , history}) => {

    const [sdkReady, setSdkReady] = useState(false);
    const dispatch = useDispatch();
    const orderId = match.params.id;
    

    const orderDetailReducer = useSelector(state => state.orderDetailReducer)
    const { order, isLoading, errorMessage} = orderDetailReducer;
    
    const orderPayReducer = useSelector(state => state.orderPayReducer)
    const userReducer = useSelector(state => state.userReducer);
    const orderDeliverReducer = useSelector(state => state.orderDeliverReducer);

    const { isLoading: isLoadingPay, success,} = orderPayReducer  
    const { isLoading: loadingDeliver} = orderDeliverReducer;
    const { currentUser } = userReducer;
    useEffect(() => {
            const addPayPalScript = async () => {
                const { data: clientId } = await Axios.get('/api/config/paypal')
                const script = document.createElement('script')
                script.type = 'text/javascript'
                script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
                script.async = true
                script.onload = () => {
                setSdkReady(true)
                }
                script.onerror = () => {
                    throw new Error('Paypal SDK could not be loaded.');
                  };
                  document.body.appendChild(script);
            }
            if(orderId) {
                dispatch(orderDetail(orderId));
            } else if(!order.isPaid) {
                if (window !== undefined && window.paypal === undefined) {
                    addPayPalScript();
                } else if (
                    window !== undefined &&
                    window.paypal !== undefined
                ) {
                    sdkReady(true)
                }
            }  
        
    }, [dispatch, orderId, success,])

    const successPayHandler = (paymentResult) => {
        dispatch(orderUpdateToPaid(orderId, paymentResult))
    }
    const deliverHandler = () => {
            dispatch(orderUpdateToDeliver(orderId))
            setTimeout(() => {
                history.push('/admin/orderlist')
            }, 1000);;
    }
    return isLoading ? <Loader /> : errorMessage ? <Message text={errorMessage} />
        : <>
                <h1>Order Id: {order._id}</h1>
                <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>
                                    Name: {order.user.name.toUpperCase()} 
                                </strong>
                            </p>
                            <p>
                                <strong>
                                    Email:  
                                </strong>
                                <a href={`mailto:${order.user.email}`} className="text-dark text-decoration-none" > {order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                
                                    {order.shippingAddress['address']},{order.shippingAddress.city},
                                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            <div>
                                
                                { order.isDelivered ? <Message text={`Deliver on ${order.deliveredAt} `} color="#42ba96"/> 
                                : <Message text="Not Delivered" />}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <div>
                                <strong>Method: </strong>
                                {
                                    order.paymentMethod
                                }
                                { order.isPaid ? <Message text={`Paid on ${order.paidAt} `} color="#42ba96"  /> 
                                : <Message text="Not paid" />}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {
                                order.orderItems.length === 0 ? <Message text="Your cart is empty" />
                                : <ListGroup variant="flush">
                                        {order.orderItems.map((item, index) => <ListGroup.Item key={index}>
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
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                
                                    { !order.isPaid && (
                                            <ListGroup.Item>
                                               {
                                                   isLoadingPay && <Loader />
                                               }
                                               {
                                                   sdkReady ? <Loader /> : <PayPalButton amount={order.totalPrice}
                                                    onSuccess={successPayHandler}
                                                   />
                                               }
                                            </ListGroup.Item>
                                    )}
                                    {loadingDeliver && <Loader />}
                                                { currentUser && currentUser.isAdmin && !order.isDelivered ? (
                                                    <ListGroup.Item>
                                                    <Button
                                                    type='button'
                                                    className='btn btn-block'
                                                    variant="dark"
                                                    onClick={deliverHandler}
                                                    >
                                                    Mark As Delivered
                                                    </Button>
                                                </ListGroup.Item>
                                    ): null}
                            </ListGroup>
                        </Card>
                </Col>
            </Row>           
        </>
}

export default OrderScreen;

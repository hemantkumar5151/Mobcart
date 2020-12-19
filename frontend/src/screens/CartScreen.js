import React,{ useEffect } from 'react';
import { Row, Col, ListGroup,Image, Form , Button, Card} from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import { addItemToCart, removeItemFromCart  } from '../redux/cart/actionCreator';

const CartScreen = ({ match, history, location}) => {
    const productId = match.params.id;
    const dispatch = useDispatch();    
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const cartReducer = useSelector(state => state.cartReducer)
    const { cartItems } = cartReducer;
    useEffect(() => {
        if(productId) {
            dispatch(addItemToCart(productId, qty));
        }   
    },[dispatch, productId, qty]);


    const removeHandler = (id) => {
         dispatch(removeItemFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping cart</h1>
                {
                    cartItems.length === 0 ?   <div className="d-inline">
                        <Message  text="Your cart is empty" color="#5bc0de" />
                        <Link to="/" className="btn btn-light">go to shopping</Link>
                    </div> :
                        <ListGroup className="flush border-less">
                            {
                                cartItems.map(item => <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}  className="text-secondary">
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link className="text-secondary text-decoration-none" to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
                                        </Col >
                                        <Col md={2}  className="text-secondary">
                                            {item.price}
                                        </Col>
                                        <Col md={3}  className="text-secondary">
                                            {
                                                <Form.Control
                                                    as="select"
                                                    value={item.qty}
                                                    onChange={(e) => dispatch(addItemToCart(item.product, Number(e.target.value))) }
                                                >
                                                    {
                                                        [...Array(item.countInStock).keys()].map(index => <option key={index} value={index+1} >
                                                            {index+1}
                                                        </option>)
                                                    }
                                                </Form.Control>
                                            }
                                        </Col>
                                        <Col md={2}>
                                            <Button  variant="light"  type="button" onClick={() => removeHandler(item.product)}>
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>)
                            }
                        </ListGroup>
                }
            </Col>
            {
                cartItems.length > 0 && (<Col md={4}>
                    <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                        <h2>
                            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                            items
                        </h2>
                        $
                        {cartItems
                            .reduce((acc, item) => acc + item.qty * item.price, 0)
                            .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Button
                            type='button'
                            variant="dark"
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                        </Button>
                        </ListGroup.Item>
                    </ListGroup>
                    </Card>
                </Col>)
            }
        </Row>

    )
}

export default CartScreen

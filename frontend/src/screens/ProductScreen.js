import React, { useState, useEffect } from 'react';
import {Row, Col,Image, ListGroup, Card, Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { fetchProductDetail, productReviewCreate } from '../redux/product/actionCreator';
import { useSelector, useDispatch} from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
const ProductScreen = (props) => { 
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1); 
    const [rating, setRating] = useState('')
    const [comment, setComment] = useState('');

    const dispatch = useDispatch()
    const productDetailReducer = useSelector(state => state.productDetailReducer)
    const { product, isLoading, errorMessage} = productDetailReducer;
    const productReviewReducer = useSelector(state => state.productReviewReducer)
    const {  isLoading: isReviewLoading, errorMessage : reviewErrorMessage} = productReviewReducer;

    const userReducer = useSelector(state => state.userReducer)
    const { currentUser } = userReducer;
   
    useEffect(() => {
        dispatch(fetchProductDetail(productId))
    },[dispatch, productId])

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(productReviewCreate(productId, { rating, comment}));
    }
    return (
        <>
            <Link to="/" className="btn btn-light my-3">back</Link>
            { errorMessage && <Message text={errorMessage} />}
            {
                isLoading ? <Loader /> : 
                (<>
                    
                <Meta title={product.name} description={product.description}  />
                <Row>
                    <Col md={6}>
                        <Image src={product.image}  alt={product.name} fluid/>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h4>{product.name}</h4>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: $ {product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price: </Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status: </Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In stack' : 'Out of stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {
                                    product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Quantity:</Col>
                                                <Col>
                                                    <Form.Control as ="select" value={qty} onChange={e => setQty(e.target.value)} >
                                                    {
                                                        [...Array(product.countInStock).keys()].map(x => <option key={x+1} value={x+1}>
                                                            {x+1}
                                                        </option>) 
                                                    } 
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )
                                }
                                <ListGroup.Item>
                                    <Button className="btn btn-dark btn-block" disabled={product.countInStock <= 0} onClick={addToCartHandler}>
                                        add to cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row> 
                
                <Row>
                    <Col md={6}>
                        <h2>Reviews</h2>
                        {
                            product.reviews.length === 0 && <Message text="No review found" />
                        }
                        <ListGroup variant="flush">
                            {
                                product.reviews.map(review => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))
                            }
                            <ListGroup.Item>
                                <h2>Write a Customer Review</h2>
                                {isReviewLoading && <Loader />}
                                {reviewErrorMessage && (
                                    <Message   text={reviewErrorMessage}/>
                                )}
                                {currentUser ? (
                                    <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control
                                        as='select'
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                        >
                                        <option value=''>Select...</option>
                                        <option value='1'>1 - Poor</option>
                                        <option value='2'>2 - Fair</option>
                                        <option value='3'>3 - Good</option>
                                        <option value='4'>4 - Very Good</option>
                                        <option value='5'>5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='comment'>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control
                                        as='textarea'
                                        row='3'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Button
                                        disabled={isReviewLoading}
                                        type='submit'
                                        variant='primary'
                                    >
                                        Submit
                                    </Button>
                                    </Form>
                                ) : (
                                    <h4 className="block bg-danger">
                                        <Link to='/login' className="text-dark text-decoration-none"> Please sign in  to write a review{' '}</Link>
                                    </h4>
                                   
                                )}
                                </ListGroup.Item>
              
                        </ListGroup>
                    </Col>
                </Row>
                </>)
            }
        </>
    )
}

export default ProductScreen

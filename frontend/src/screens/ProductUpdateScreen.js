import React, { useState, useEffect } from 'react';
import {Form, Button, } from 'react-bootstrap';
import { useSelector, useDispatch} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { fetchProductDetail, productUpdate,  } from '../redux/product/actionCreator';
import FormContainer from '../components/FormContainer';

const ProductUpdateScreen = ({  history, match }) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand ] = useState('');
    const [image, setImage] = useState('')
    const [countInStock, setCountInStock] = useState(0)

    
    const userReducer = useSelector(state => state.userReducer);
    
    const { isLoading ,errorMessage, currentUser} = userReducer;
    const dispatch = useDispatch();
    const productId = match.params.id;

    const productDetailReducer = useSelector(state => state.productDetailReducer)
    const { product} = productDetailReducer
    
    useEffect(() => {
        if(!product) {
            dispatch(fetchProductDetail(productId));
        } else {
            setName(product.name)
            setPrice(product.price)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
            setImage(product.image)
        }
    },[dispatch, productId, product]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(productUpdate(productId,{ name, price, description, countInStock, category, brand, image}))
        setTimeout(() => {
            history.push('/admin/productlist')
        }, 1000);;
    }
    return (
        <FormContainer>
            <h1>Register</h1>
            { errorMessage && <Message text={errorMessage} />}
            { isLoading ? <Loader />   : <div>
                <Form onSubmit={submitHandler}>            
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="name" value={name} onChange={e=> setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" placeholder="price" value={price} onChange={e=> setPrice(Number(e.target.value))}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="description" value={description} onChange={e=> setDescription(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Stock Number</Form.Label>
                        <Form.Control type="text" placeholder="stock" value={countInStock} onChange={e=> setCountInStock(Number(e.target.value))}></Form.Control>
                    </Form.Group>
                    

                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="category" value={category} onChange={e=> setCategory(e.target.value)}></Form.Control>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" placeholder="brand" value={brand} onChange={e=> setBrand(e.target.value)}></Form.Control>
                    </Form.Group>
                    
                    <Button type="button" variant="dark" onClick={submitHandler}>
                        update product
                    </Button>
                
                </Form>
        
            </div>  }
            </FormContainer>
    )
}

export default ProductUpdateScreen

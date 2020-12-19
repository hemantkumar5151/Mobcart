import React, { useState, useEffect } from 'react';
import {Form, Button, Row,Col} from 'react-bootstrap';
import { useSelector, useDispatch} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { productCreate } from '../redux/product/actionCreator';
import FormContainer from '../components/FormContainer';
import Axios from 'axios';
const ProductCreateScreen = ({ location, history }) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand ] = useState('');
    const [uploading, setUploading] = useState(false)
    const [countInStock, setCountInStock] = useState(0)
    const [image, setImage] = useState('')
    
    const userReducer = useSelector(state => state.userReducer);
    
    const { isLoading ,errorMessage, currentUser} = userReducer;
    const dispatch = useDispatch();

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]

        const formData = new FormData();

        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
            const {data} = await Axios.post(`/api/upload`,formData,config)
            setImage(data)
            setUploading(false)
            
        } catch (error) {
            console.log(error)
            setUploading(false)
            // dispatch(userDeleteFailed(error.message  && error.response.data.message ? error.response.data.message : error.message));
    }
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(productCreate({ name, price, description, countInStock, category, brand, image}))
        history.push('/admin/productlist');
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
                    
                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter image url'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                        <Form.File
                            id='image-file'
                            label='Choose File'
                            custom
                            onChange={uploadFileHandler}
                        ></Form.File>
                        {uploading && <Loader />}
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
                        Create product
                    </Button>
                
                </Form>
        
            </div>  }
            </FormContainer>
    )
}

export default ProductCreateScreen

import React, { useState ,useEffect } from 'react'
import { Row,Col } from 'react-bootstrap';
import axios from 'axios';

import Product from '../components/Product.js';
const HomeScreen = () => {
    const [products , setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const { data  } = await axios.get('/api/products');
            setProducts(data);
        }
        fetchProducts()
        return () => fetchProducts();
    },[])
    return (
        <>
            <h2>Latest Products</h2>
            <Row>
            {
                products ? products.map(product => <Col sm={12}  md={6} lg={4} xl={3} key={product._id} >
                    <Product product={product}/>
                </Col>) : <h1>Loading...</h1>
            }
            </Row>
        </>
    )
}

export default HomeScreen

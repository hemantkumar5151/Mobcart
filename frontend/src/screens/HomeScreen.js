import React from 'react'
import { Row,Col } from 'react-bootstrap';
import products from '../data/products';

import Product from '../components/Product.js'
const HomeScreen = () => {
    return (
        <>
            <h2>Latest Products</h2>
            <Row>
            {
                products.map(product => <Col sm={12}  md={6} lg={4} xl={3} key={product._id} >
                    <Product product={product}/>
                </Col>)
            }
            </Row>
        </>
    )
}

export default HomeScreen

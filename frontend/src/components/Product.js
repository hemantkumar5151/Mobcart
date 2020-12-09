import React from 'react'
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Rating from './Rating';

const Product = ({ product }) => {
    return (
        <LinkContainer to={`/product/${product._id}`}>
            <Card  className="my-3 p-3 rounded">
                <Card.Img src={product.image} />
                <Card.Body>
                    <Card.Title as="div"><strong>{product.name}</strong></Card.Title>
                    <Card.Text as="div">
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </Card.Text>
                    <Card.Text as="h4" className="py-2">
                        ${product.price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </LinkContainer>
        )
}

export default Product

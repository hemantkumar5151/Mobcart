import React from 'react'
import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
    return (
        <Card  className="my-3 p-3 rounded">
            <Card.Img src={product.image} />
            <Card.Body>
                <Card.Title as="div"><strong>{product.name}</strong></Card.Title>
                <Card.Text as="div">
                    <div className="my-3">
                        {product.rating} from {product.numReviews} reviews
                    </div>
                </Card.Text>
                <Card.Text as="h4">
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product

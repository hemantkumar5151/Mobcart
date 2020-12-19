import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import {Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { addShippingAddress } from '../redux/cart/actionCreator'
import CheckoutStep from '../components/CheckoutStep';
const ShippingScreen = ({ history }) => {

    const cartReducer = useSelector(state => state.cartReducer)
    const { shippingAddress } = cartReducer;

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
    
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(addShippingAddress({ address, city, postalCode, country}));
        history.push('/payment')
    }
    return (
            <FormContainer>
                <CheckoutStep step1 step2 />
                <h1>Shipping address</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="address" value={address} onChange={e=> setAddress(e.target.value)} required></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="city" value={city} onChange={e=> setCity(e.target.value)} required></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type="text" placeholder="postal code" value={postalCode} onChange={e=> setPostalCode(e.target.value)} required></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" placeholder="country" value={country} onChange={e=> setCountry(e.target.value)} required></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="dark" onClick={handleSubmit}>
                        Continue
                    </Button>
                </Form>
            </FormContainer>
        )
}

export default ShippingScreen

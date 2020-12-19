import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import {Form, Button, Row,Col} from 'react-bootstrap';
import { useSelector, useDispatch} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {  userLogin } from '../redux/user/actionCreator';
import FormContainer from '../components/FormContainer';
import CheckoutStep from '../components/CheckoutStep';
const LoginScreen = ({ location, history }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userReducer = useSelector(state => state.userReducer);
    const { isLoading ,errorMessage, currentUser} = userReducer;
    const dispatch = useDispatch();

    useEffect(() => {
        if(currentUser) {
            history.push(redirect);
        }
    },[history, currentUser, redirect])
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(userLogin(email, password))
    }
    return (
        <FormContainer>
            <CheckoutStep step1 />
            <h1>Sign in</h1>
            { errorMessage && <Message text={errorMessage} />}
            { isLoading ? <Loader />   : <div>
                <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="email" value={email} onChange={e=> setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" value={password} onChange={e=> setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type="button" variant="dark" onClick={submitHandler}>
                    Sign in
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                   <span className="text-secondary"> New Customer?</span> 
                    <Link to={redirect ? `/register?Redirect=${redirect}` : '/register'} className="text-dark text-decoration-none">Register</Link>
                </Col>
            </Row>
        
            </div>  }
            </FormContainer>
    )
}

export default LoginScreen

import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import {Form, Button, Row,Col} from 'react-bootstrap';
import { useSelector, useDispatch} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {  userRegister } from '../redux/user/actionCreator';
import FormContainer from '../components/FormContainer';

const RegisterScreen = ({ location, history }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const userReducer = useSelector(state => state.userReducer);
    
    const { isLoading ,errorMessage, currentUser} = userReducer;
    const dispatch = useDispatch();

    useEffect(() => {
        if(currentUser) {
            history.push('/')
        }
    },[history, currentUser])
    const submitHandler = (e) => {
        if(password !== confirmPassword) {
            alert('Password does not match');
        } else {
            e.preventDefault();
            dispatch(userRegister(name, email, password))
        }
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
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="email" value={email} onChange={e=> setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" value={password} onChange={e=> setPassword(e.target.value)}></Form.Control>
                </Form.Group>


                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="confirm password" value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="button" variant="dark" onClick={submitHandler}>
                    Register
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                   <span className="text-secondary"> Already Registered?</span> 
                   <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-dark text-decoration-none">Sign in</Link>
                </Col>
            </Row>
        
            </div>  }
            </FormContainer>
    )
}

export default RegisterScreen

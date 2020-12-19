import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import {Form, Button, } from 'react-bootstrap';
import { useSelector, useDispatch} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {  userDetail, userUpdate } from '../redux/user/actionCreator';
import FormContainer from '../components/FormContainer';

const UserEditScreen = (props) => {
    
    const {  history, match } = props;
    const userId = match.params.id;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    
    const userDetailReducer = useSelector(state => state.userDetailReducer);
    
    const { isLoading ,errorMessage, currentUser } = userDetailReducer;

    const dispatch = useDispatch();
    useEffect(() => {
        if(!currentUser ) {
            dispatch(userDetail(userId));
        }  else {
            setName(currentUser.name);
            setEmail(currentUser.email);
            setIsAdmin(currentUser.isAdmin)
        }
    },[dispatch, currentUser, userId]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(userUpdate(userId,{ name, email, isAdmin}));
        history.push('/admin/userlist');
        dispatch(userDetail(userId));
    }

    return (
        <>
        <Link to="/admin/userlist" className="btn btn-light">
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit User</h1>
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
                    <Form.Group controlId="isAdmin">
                        <Form.Check
                            type="checkbox"
                            label="Is Admin"
                            checked={isAdmin}
                            className="text-secondary font-weight-bold"
                            onChange={e => setIsAdmin(e.target.checked)}
                        ></Form.Check>
                    </Form.Group>
                    <Button type="button" variant="dark" onClick={submitHandler}>
                        update
                    </Button>
            </Form>
            </div>  }
            </FormContainer>
        </>
    )
}

export default UserEditScreen;

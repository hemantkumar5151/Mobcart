import React, { useEffect } from 'react'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Table, Button, } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {  userList, userDelete } from '../redux/user/actionCreator'
import { LinkContainer } from 'react-router-bootstrap';
const UserList = ({ history }) => {
    const dispatch = useDispatch()

    const userListReducer = useSelector(state => state.userListReducer)
    const userReducer = useSelector(state => state.userReducer)
    const userDeleteReducer = useSelector(state => state.userDeleteReducer)
    const { success,  } = userDeleteReducer;

    const { user: users, isLoading , errorMessage} = userListReducer;
    
    const { currentUser} = userReducer;
    useEffect(() => {
        if(currentUser && currentUser.isAdmin ) {
            if(success) {
                window.location.reload(true)
            }
            else {
                dispatch(userList())
            }
        } else {
            history.push('/')
        }
    },[dispatch, currentUser, history, success])

    const deleteHandler = (id) => {
        dispatch(userDelete(id))
    }
    return (
       <>
        <h1>Users List</h1>
        {
            isLoading ? <Loader /> : errorMessage ? <Message text={errorMessage}  /> : (
                <Table>
                    <thead>
                        <tr>    
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) =>   
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>
                                        <a href={`mailto:${user.email}`}>{user.email}</a>
                                    </td>
                                    <td>
                                    {user.isAdmin ? (
                                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                                    ) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}
                                    </td>
                                    <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(user._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            )
        }
       </>
    )
}

export default UserList;

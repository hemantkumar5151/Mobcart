import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { userProfile, userProfileUpdate,  } from '../redux/user/actionCreator'
import { orderList} from '../redux/order/actionCreator';
const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const dispatch = useDispatch()

  const userDetailReducer = useSelector((state) => state.userDetailReducer)
  const { isLoading, errorMessage, currentUser } = userDetailReducer;

  const userReducer = useSelector((state) => state.userReducer)
  const  userInfo  = userReducer.currentUser


  const orderListReducer = useSelector(state => state.orderListReducer)
  const { order: orders , isLoading: isLoadingOrderList, errorMessage: errorMessageOrderList} = orderListReducer;
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!currentUser || !currentUser.name ) {
        dispatch(userProfile())
        dispatch(orderList());
      } else {
        setName(currentUser.name)
        setEmail(currentUser.email)
      }
    }
  }, [dispatch, history, currentUser,userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Password does not match')
    } else {
        dispatch(userProfileUpdate(name, email,password))
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {errorMessage && <Message text={errorMessage} />}
        
        {isLoading ? (
          <Loader />
        ) : errorMessage ? (
          <Message text={errorMessage} />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='dark'>
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {
            errorMessageOrderList && <Message text={errorMessageOrderList} />
        }
        {
          isLoadingOrderList ? <Loader /> : (    <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                              order.paidAt.substring(0, 10)
                            ) : (
                              <i className='fas fa-times' style={{ color: 'red' }}></i>
                            )
                          }
                        </td>
                        <td>
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                          )}
                        </td>
                        <td>
                          <LinkContainer to={`/order/${order._id}`}>
                            <Button className='btn-sm' variant='light'>
                              Details
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
          )
        }
      </Col>
    </Row>
  )
}

export default ProfileScreen
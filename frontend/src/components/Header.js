import React, { useEffect} from 'react';
import { Navbar, Nav,Container, NavDropdown, } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../redux/user/actionCreator';
import SearchBox from '../components/SearchBox';

const Header = () => {

    const userReducer = useSelector(state => state.userReducer);
    const dispatch = useDispatch()
    const { currentUser} = userReducer;
    useEffect(() => {
        window.addEventListener('storage',(e) => {
            if(!currentUser) {
                window.location.assign("http://localhost:3000/");
            }
        })
    },[currentUser])
    const logoutHandler = e => {
        e.preventDefault();
        dispatch(userLogout());
        
        localStorage.removeItem('cart')
        localStorage.removeItem('shippingAddress')
        localStorage.removeItem('paymentMethod');
        localStorage.removeItem('currentUser');
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Mobcart</Navbar.Brand>
                    </LinkContainer>
                    <SearchBox />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i> Cart
                                </Nav.Link>
                            </LinkContainer>
                            {currentUser ? (
                                <NavDropdown title={currentUser.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                <Nav.Link>
                                    <i className='fas fa-user'></i> Sign In
                                </Nav.Link>
                                </LinkContainer>
                            )}
                            {currentUser && currentUser.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header

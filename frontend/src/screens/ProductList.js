import React, { useEffect } from 'react'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Table, Button,Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { productBelongToSpecificUser, productDelete  } from '../redux/product/actionCreator'
import { LinkContainer } from 'react-router-bootstrap';
import Paginate from '../components/Pagination';

const ProductList = ({ history }) => {
    const dispatch = useDispatch()

    const productListReducer = useSelector(state => state.productListReducer)
    const productDeleteReducer = useSelector(state => state.productDeleteReducer)
    const { success} = productDeleteReducer
    const userReducer = useSelector(state => state.userReducer)

    const { products,isLoading , errorMessage, page, pages} = productListReducer;
    
    const { currentUser} = userReducer;
        
    useEffect(() => {
        if((currentUser && currentUser.isAdmin) || success ) {
            dispatch(productBelongToSpecificUser())
        }
    },[dispatch, currentUser, history, success])

    const deleteHandler = (id) => {
        dispatch(productDelete(id))
    }
    return (
       <>
        <Row className="align-items-center">
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className="text-right">
                <Button className="btn btn-dark my-3" onClick={() => history.push('/admin/create-product')}>
                    <i className="fas fa-plus"></i> {' '}create product</Button>
            </Col>
        </Row>
        {
            isLoading ? <Loader /> : errorMessage ? <Message text={errorMessage}  /> :  <>
                <Table>
                    <thead>
                        <tr>    
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product) =>   
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(product._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
                <Paginate isAdmin={true}  page={page} pages={pages} />
            </>
        }
       </>
    )
}

export default ProductList;

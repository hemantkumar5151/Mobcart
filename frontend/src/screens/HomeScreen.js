import React, { useEffect } from 'react'
import { Row,Col } from 'react-bootstrap';
import { fetchProductList } from '../redux/product/actionCreator';
import { useSelector, useDispatch} from 'react-redux';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Pagination';
import Carousel from '../components/Carousel';
import Meta from '../components/Meta';
const HomeScreen = ({ match }) => {
    const dispatch = useDispatch();
    const search = match.params.keyword;
    const pageNumber = match.params.pageNumber;

    const productListReducer = useSelector(state => state.productListReducer)
    const { products, isLoading, errorMessage, page, pages} = productListReducer;
    useEffect(() => {
        dispatch(fetchProductList(search, pageNumber));
    },[dispatch, search, pageNumber]);
    return (
        <>
            <Meta />
            <Row >
                        <Carousel />
            </Row>
            <h2>Latest Products</h2>
            {errorMessage && <Message text={errorMessage}  />}
            {
                isLoading ? <Loader /> : <>
                
                <Row>
                    
                    { products.map(product => <Col sm={12}  md={6} lg={4} xl={3} key={product._id} >
                        <Product product={product}/>
                    </Col>) 
                    }
                 </Row>
                 <Paginate pages={pages} page={page} keyword={search ? search : ''} />
                 </>
            } 
        </>
    )
}

export default HomeScreen

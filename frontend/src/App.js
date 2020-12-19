import React from 'react';
import { Container } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import UserList from './screens/UserList';
import UserEditScreen from './screens/UserEditScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';
import ProductListScreen from './screens/ProductList';
import ProductUpdateScreen from './screens/ProductUpdateScreen';
import OrderListScreen from './screens/OrderListScreen';

const App = () =>  {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          
          <Route path="/search/:keyword" component={HomeScreen}  />
          <Route path="/page/:pageNumber" component={HomeScreen}  />
          <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen}  />
          
          <Route path="/product/:id" component={ProductScreen} exact/>
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen}/>
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen}/>
          <Route path="/order/:id" component={OrderScreen} exact/>
          <Route path="/admin/userlist" component={UserList} exact />
          <Route path="/admin/user/:id/edit" component={UserEditScreen}  exact/>
          <Route path="/admin/productlist" component={ProductListScreen} exact/>
          <Route path="/admin/create-product" component={ProductCreateScreen} exact/>  
          <Route path="/admin/product/:id/edit" component={ProductUpdateScreen} exact/>
          <Route path="/admin/orderlist" component={OrderListScreen}/>
        
          <Route path="/" component={HomeScreen} exact />
          
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;

import './bootstrap';
import React from 'react'
import ReactDOM from 'react-dom'
import Home from './pages/Home'
import ProductList from "./pages/ProductList";
import Product from "./pages/Product"
import Cart from './pages/Cart';

import '../css/app.scss'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryDetail from './pages/CategoryDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Password from './pages/Password';

import OrderNow from './pages/OrderNow';
import Wishlist from './pages/Wishlist';
import Myorders from './pages/Myorders';

import Mysingleorder from './pages/Mysingleorder';
import { useState } from 'react';



const App = () => {

  let w = localStorage.getItem("wishlistId")
if (w == undefined || w == '') w = [];
else  w = JSON.parse( w)

const [my_wishlist, SetMyWishlist] = useState(w)


  React.useEffect(() => {
    // Update the document title using the browser API


},[]);

  return (
    <>


      <Router>
        <Routes>
          <Route exact path="/"
            element={<Home />} />
          <Route exact path="/home"
            element={<Home />} />
          <Route exact path="/@/productlist"
            element={<ProductList />} />



          <Route exact path="/@/product/:slug"
            element={<Product />} />


          <Route exact path="/@/profile"
            element={<Profile />} />
          <Route exact path="/@/password"
            element={<Password />} />


          <Route exact path="/@/register"
            element={<Register />} />
          <Route exact path="/@/login"
            element={<Login />} />
          <Route exact path="/@/cart"
            element={<Cart />} />
             <Route exact path="/@/wishlist"
            element={<Wishlist />} />
          <Route path="/@/category/:slug"
            element={<CategoryDetail />} />
		  <Route path="/@/OrderNow"
               element = {<OrderNow/>}/>
                <Route path="/@/Myorder"
               element = {<Myorders/>}/>
         <Route path="/@/Mysingleorder/:id"
               element = {<Mysingleorder/>}/>

        </Routes>
      </Router>


    </>
  )
}

export default App

if (document.getElementById('root')) {
  ReactDOM.render(<App />, document.getElementById('root'));
}

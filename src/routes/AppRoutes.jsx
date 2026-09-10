import React from 'react'
import Register from '../pages/Register'
import Home from "../pages/Home"
import Login from "../pages/Login"
import Cart from "../pages/Cart"
import Checkout from '../pages/Checkout'
import NotFound from '../pages/NotFound'
import Orders from '../pages/Orders'
import Product from '../pages/Product'
import ProductDetails from '../pages/ProductDetails'
import Wishlist from '../pages/Wishlist'
import {Route,Routes} from "react-router-dom"
import UserLayoute from '../layouts/UserLayoute'
import ProtecteRoute from './ProtecteRoute'
function AppRoutes() {
  return (
    <div>
      <Routes>
              <Route element={<UserLayoute/>}>
        <Route path='/' element={<Home/>}/>
         <Route path='/product/:id' element={<ProductDetails/>}/>
                 <Route path="/product" element={<Product/>}/>
<Route element={<ProtecteRoute/>}>
        <Route path='/checkout' element={<Checkout/>}/>
     <Route path="/orders" element={<Orders/>}/>
      <Route path='/wishlist' element={<Wishlist/>}/>
         <Route path='/cart' element={<Cart/>}/>
         </Route></Route>
            <Route path="/login" element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default AppRoutes

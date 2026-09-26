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
import { Route, Routes, Navigate } from "react-router-dom"
import UserLayoute from '../layouts/UserLayoute'
import ProtecteRoute from './ProtecteRoute'
import About from '../pages/About'
import Contact from '../pages/Contact'
import { useSelector } from 'react-redux'
import UserRoute from "./UserRoute";

function AppRoutes() {
  const { user } = useSelector((state) => state.auth)
  return (
    <div>
     
 <Routes>

  {/* User routes */}
  <Route element={<UserRoute />}>
    
    <Route element={<UserLayoute />}>

      <Route path="/" element={<Home />} />

      <Route path="/product/:id" element={<ProductDetails />} />

      <Route path="/product" element={<Product />} />

      <Route path="/about" element={<About />} />

      <Route path="/contact" element={<Contact />} />

      {/* Login required */}
      <Route element={<ProtecteRoute />}>

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/cart" element={<Cart />} />

      </Route>

    </Route>

  </Route>


  {/* Login/Register */}
  <Route
    path="/login"
    element={user ? <Navigate to="/" replace /> : <Login />}
  />

  <Route
    path="/register"
    element={user ? <Navigate to="/" replace /> : <Register />}
  />

</Routes>

    </div>
  )
}

export default AppRoutes

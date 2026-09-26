import React from 'react'
import { Routes, Route } from "react-router-dom";

import AdminProtuctedRoute from './AdminProtuctedRoute';

import ProductForm from '../AdminPages/ProductForm';
import AdminDashboard from '../AdminPages/AdminDashboard';
import AdminOrderDetails from '../AdminPages/AdminOrderDetails';
import AdminOrders from '../AdminPages/AdminOrders';
import AdminProduct from '../AdminPages/AdminProduct';
import AdminUsers from '../AdminPages/AdminUsers';
import AdminLayoute from '../layouts/AdminLayoute';
function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayoute />}>
        <Route element={<AdminProtuctedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProduct />} />
          <Route path="/admin/products/add" element={<ProductForm />} />
          <Route path="/admin/products/edit/:id" element={<ProductForm />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />

        </Route>
      </Route>
    </Routes>
  )
}

export default AdminRoutes


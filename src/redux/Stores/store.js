import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlices.js'
import cartReducer from "../slice/cartSlice.js"
import wishlistReducer from "../slice/wishlistSlice.js";
import AdminProductReducer from "../adminSlice/AdminProductSlice";
import AdminUsersReducer from "../adminSlice/AdminUserSlice.js"
import AdminOrderReducer from "../adminSlice/AdminOrderSlice.js"
import checkoutReducer from "../slice/checkoutSlice.js"
export const store = configureStore({
  reducer: {
    auth : authReducer,
    cart:cartReducer,
    wishlist:wishlistReducer,
    adminProducts:AdminProductReducer,
    adminUsers:AdminUsersReducer,
    adminOrders:AdminOrderReducer,
    checkout:checkoutReducer
  }
});


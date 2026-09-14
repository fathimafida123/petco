import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlices.js'
import cartReducer from "../slice/cartSlice.js"
import wishlistReducer from "../slice/wishlistSlice.js";
export const store = configureStore({
  reducer: {
    auth : authReducer,
    cart:cartReducer,
    wishlist:wishlistReducer
  }
});


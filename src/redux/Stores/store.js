import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlices.js'

export const store = configureStore({
  reducer: {
    auth : authReducer
  }
});
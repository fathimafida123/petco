

import { createSlice } from "@reduxjs/toolkit";
import { removeUser } from "../../utils/localStorege";

const initialState = {
  user: null,
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },

    restoreUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },

    logout: (state) => {
      state.user = null;
      state.isLoading = false;
      removeUser();
    },
  },
});

export const {
  loginSuccess,
  restoreUser,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
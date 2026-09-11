// import { createSlice } from "@reduxjs/toolkit";

// const savedUser = localStorage.getItem("user");

// const initialState = {
//   user: savedUser ? JSON.parse(savedUser) : null,
//   isLoading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,

//   reducers: {
//     loginSuccess: (state, action) => {
//       state.user = action.payload;
//     },

//     logout: (state) => {
//       state.user = null;
//       localStorage.removeItem("user");
//     },
//   },
// });

// export const { loginSuccess, logout } = authSlice.actions;
// export default authSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import { getUser, removeUser } from "../../utils/localStorege";

// const initialState = {
//   user: getUser(),
//   isLoading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,

//   reducers: {
//     loginSuccess: (state, action) => {
//       state.user = action.payload;
//     },

//     logout: (state) => {
//       state.user = null;
//       removeUser();
//     },
//   },
// });

// export const { loginSuccess, logout } = authSlice.actions;

// export default authSlice.reducer;

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
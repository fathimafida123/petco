
import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../utils/localStorege";

const initialState = {
    user: getUser(),
    isLoggedIn: false,
    isLoading: false,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.error = null;
        }
    }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
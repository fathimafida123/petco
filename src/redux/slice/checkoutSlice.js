import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice=createSlice({name:"checkout",initialState:{items:null},
reducers:{
    addProduct:(state,action)=>{state.items=action.payload}
}})

export const {addProduct}=checkoutSlice.actions;
export default checkoutSlice.reducer
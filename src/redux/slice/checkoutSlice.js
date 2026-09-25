import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice=createSlice({name:"checkout",initialState:{items:null},
reducers:{
    addProduct:(state,action)=>{state.items=action.payload},
     clearCheckout:(state,action)=>{state.items=null}
}})

export const {addProduct,clearCheckout}=checkoutSlice.actions;
export default checkoutSlice.reducer
import { createSlice } from "@reduxjs/toolkit";
 const AdminOrderSlice=createSlice({name:"order" ,initialState:{order:[],loading:false,error:null},
reducers:{
    setOrders:(state,action)=>
        {state.order=action.payload},
    setLoading:(state,action)=>{
        state.loading=action.payload
    },
    setError:(state,action)=>{
        state.error=action.payload
    }
}})

export const{setOrders,setError,setLoading}=AdminOrderSlice.actions
export default AdminOrderSlice.reducer


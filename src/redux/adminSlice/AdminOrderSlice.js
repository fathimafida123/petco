import { createSlice } from "@reduxjs/toolkit";
import { setError, setLoading } from "./AdminUserSlice";
 const AdminProductSlice=createSlice({name:"order" ,initialState:{order:[],loading:false,error:null},
reducer:{
    setOrders:(state,action)=>
        {state.order=action.payload},
    setLoading:(state,action)=>{
        state.loading=action.payload
    },
    setError:(state,action)=>{
        state.error=action.payload
    }
}})

export const{setOrders,setError,setLoading}=AdminProductSlice.actions
export default AdminProductSlice.reducer


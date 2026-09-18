import { createSlice } from "@reduxjs/toolkit";

const AdminUsersSlice=createSlice({name:"adminusers",initialState:{users:[],loading:false,error:null},
reducers:{
    setUsers:(state,action)=>{state.users=action.payload},
    setLoading:(state,action)=>{state.loading=action.payload},
    setError:(state,action)=>{state.error=action.payload},
    updateUsers:(state,action)=>{state.users.map((user)=>user.id==action.payload.id ?action.payload:product)}
},

})
export const{setError,setLoading,setUsers,updateUsers}=AdminUsersSlice.actions;
export default AdminUsersSlice.reducer
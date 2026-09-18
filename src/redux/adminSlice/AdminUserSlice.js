import { createSlice } from "@reduxjs/toolkit";

const AdminUsersSlice=createSlice({name:"adminusers",initialState:{users:[],loading:false,error:null},
reducers:{
    setUsers:(state,action)=>{state.users=action.payload},
    setLoading:(state,action)=>{state.loading=action.payload},
    setError:(state,action)=>{state.error=action.payload},
    setupdateUsers:(state,action)=>{state.users=state.users.map((user)=>user.id==action.payload.id ?action.payload:user)}
},

})
export const{setError,setLoading,setUsers,setupdateUsers}=AdminUsersSlice.actions;
export default AdminUsersSlice.reducer
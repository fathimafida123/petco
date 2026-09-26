import {Navigate,Outlet} from "react-router-dom"
import { useSelector } from "react-redux"
import React from 'react'

function UserProtect() {
   const {user,isLoading}= useSelector((state)=>state.auth)
   if(isLoading){
    return <h2>Loading...</h2>
   }
   if(user){
    return <Navigate to="/" replace/>

   }
  return <Outlet/>
}

export default UserProtect

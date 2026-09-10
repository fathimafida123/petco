import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from 'react'

function ProtecteRoute() {
    const user=useSelector((state)=>state.auth.user)
    if(!user){
        return <Navigate to="/login" replace/>
    }
  return  <Outlet/>
    
}

export default ProtecteRoute

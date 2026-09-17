import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,Outlet } from 'react-router-dom'
function AdminProtuctedRoute() {
    const {user}=useSelector((state)=>state.auth)
    if(!user){
        return <Navigate to="/login" replace/>
    }

    if(user.role !=="admin"){
        return <Navigate to="/" replace/>
    }
return <Outlet/>

}

export default AdminProtuctedRoute


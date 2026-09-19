import React, { useEffect } from 'react'
import { getOrders } from '../services/order services'
import { useDispatch } from 'react-redux'
import { setLoading,setError,setOrders } from '../redux/adminSlice/AdminOrderSlice'
function AdminOrders() {
  const dispatch=useDispatch()
  useEffect(()=>{
     const loadOrders=async()=>{
    try{
      dispatch(setLoading(true))
  const orders=await getOrders()
 dispatch(setOrders(orders))
    }catch(error){
     dispatch(setError("failed to load orders"))
    }finally{
      dispatch(setLoading(false))
    }
  }
  loadOrders()
},[dispatch])
  return (
    <div>
      
    </div>
  )
}

export default AdminOrders

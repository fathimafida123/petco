import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOrders } from '../services/order services'
function AdminOrderDetails() {
  const[orderDetails,setOredrDetails]=useState(null)
  const {id}=useParams()
  useEffect(()=>{
  const identifyOrder=async()=>{
  const orders= await getOrders()
  const filterOrder=orders.find((item)=>String(item.id)===String(id))
  setOredrDetails(filterOrder)

};identifyOrder() },[id])



  return (
    <div>
      
    </div>
  )
}

export default AdminOrderDetails

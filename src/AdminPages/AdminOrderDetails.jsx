import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getAllOrders } from '../services/order services'
import { useNavigate } from 'react-router-dom'
import {User,MapPin,Package,Receipt, ClipboardList,CreditCard,
  Check,Circle
}from "lucide-react"
function AdminOrderDetails() {
  const[orderDetails,setOredrDetails]=useState(null)
  const {id}=useParams()
  const navigate=useNavigate()
  useEffect(()=>{
  const identifyOrder=async()=>{
  const orders= await getAllOrders()

  const filterOrder=orders.find((item)=>String(item.id)===String(id))
  setOredrDetails(filterOrder)

};identifyOrder() },[id])
 
const statuses=["Placed","Shipped","Delivered"]
const currentStatusIndex=statuses.indexOf(orderDetails?.status)
 return (
<div className='p-6 '>
  <button
  onClick={() => navigate("/admin/orders")} className="bg-[linear-gradient(135deg,#006A71,#003F43)] hover:bg-[linear-gradient(135deg,#00545A,#002F33)] px-3 py-2 m-3 rounded-2xl text-xl text-white "
>
  ← Back to Orders
</button>
  {orderDetails && (
    <div>
    <div className='bg-[linear-gradient(135deg,#8DD3D1,#48A6A7)]  
 rounded-xl shadow p-6 text-black'>
    <div className='flex items-center gap-2 mb-4'>
    <User/>
      <h2 className=' text-xl font-semibold mb-4'>Customer Details</h2>
      </div>
      <p>
        <span className='font-medium'>Name:</span>{" "}
        {orderDetails.name}
      </p>
      <p>
        <span className='font-semibold'>Email:</span>{" "}
        {orderDetails.email}
      </p>
      <p>
        <span className='font-semibold '>Phone:</span>{" "}
        {orderDetails.phone}
      </p>
    </div>
    <div className='  bg-[linear-gradient(135deg,#8DD3D1,#48A6A7)]  
 rounded-xl shadow p-6 mt-6'>
    <div className='flex items-center gap-2 mb-4'>
      <MapPin/>
      <h2 className='text-xl font-semibold mb-4 '>Delivery Address</h2></div>
      <p><span className='font-medium'>Address:</span>{" "}
      {orderDetails.address}
      </p>
      <p><span className='font-medium'>State:</span>{" "}
      {orderDetails.state}
      </p>
      <p>
        <span className='font-medium'>Pincode:</span>{" "}
        {orderDetails.pincode}
      </p>
      </div>
      <div className=' bg-[linear-gradient(135deg,#8DD3D1,#48A6A7)]  
 rounded-xl p-6 mt-6 text-black'>
    <div className='flex items-ceneter gap-3 mb-4'>
      <Package />
            <h2 className='text-xl font-semibold mb-4'>Ordered products</h2></div>
            <div className='space-y-4'>
                    {orderDetails.items.map((item)=>(
                      <div key={item.productId} className='flex items-center gap-4 border-b pb-4'>
                     <img src={item.image} alt={item.name} className='w-20 h-20 object-cover rounded-lg'/>
                     <div className='flex-1'>
                      <h3 className='font-medium'>{item.name}</h3>
                      <p className='  '>Price:₹{item.price}</p>
                      <p className=''>Quantity:{item.quantity}</p>
                     </div>
                     <p className='font-semibold'>₹{item.price * item.quantity}</p>
                      </div>
                    ))}
            </div>

      </div>
      <div className='  bg-[linear-gradient(135deg,#8DD3D1,#48A6A7)]  
 rounded-xl shadow p-6 mt-6'>
      <div className="flex items-center gap-2 mb-4">
  <Receipt size={20} />
        <h2 className='text-xl font-semibold mb-4'>Order Summery</h2></div>
        <div className='space-y-3'>
          <div className='flex justify-between'>
            <span className='  '>Subtotal</span>
            <span>₹{orderDetails.subTotal}</span>
          </div>
          <div className='flex justify-between'> 
            <span className='  '>Delivery Fee</span>
            <span>₹{orderDetails.deliveryFee}</span>
          </div>
          <div className='flex justify-between'> 
            <span className='  '>Discount</span>
            <span> - ₹{orderDetails.discount}</span>
          </div>
          <hr/>
          <div className="flex justify-between text-lg font-bold"> 
            <span>Grand Total</span>
            <span> ₹{orderDetails.grandTotal}</span>
          </div>
        </div>
      </div>
      <div className=' bg-[linear-gradient(135deg,#8DD3D1,#48A6A7)]  
  hover:bg-[linear-gradient(135deg,#A8E0DE,#5FB7B5)]
  transition-all duration-300"  rounded-xl p-6 mt-6'>
  
  <div className="flex items-center gap-2 mb-4">
    <CreditCard size={20} />
    <h2 className="text-xl font-semibold">
      Payment Information
    </h2>
  </div>


  <div className="space-y-3">
    <div className="flex justify-between">
      <span className="  ">Payment Method</span>
      <span className="font-medium uppercase">
        {orderDetails.paymentMethod}
      </span>
    </div>
 
    {orderDetails.paymentMethod === "upi" && (
      <div className="flex justify-between">
        <span className="  ">UPI ID</span>
        <span className="font-medium">
          {orderDetails.upiId}
        </span>
      </div>
    )}
  </div>


</div>
<div className='bg-[linear-gradient(135deg,#8DD3D1,#48A6A7)]  rounded-xl p-6 mt-6 '>

  <h2 className="text-xl font-semibold mb-6">
    Order Status
  </h2>

  <div className="flex items-center justify-between">
    {statuses.map((status,index) => {
      const completed=index<=currentStatusIndex
      return(<>
            <div key={status} className="flex flex-col items-center">
     <div className="w-8 h-8 rounded-full border flex items-center justify-center">
    {completed ? <Check size={18} /> : <Circle size={12}/>}
  </div>
    <span className="mt-2">
    {status}
    </span>
      </div>
      {index<statuses.length-1 && (
        <div className='flex-1 h-1 bg-green-900 mx-4'></div>
      )}
      </>
      )
})}
  </div>

</div>
      <div className='bg-[linear-gradient(135deg,#8DD3D1,#48A6A7)]  
   rounded-xl shadow p-6 mt-6'>
      <div className="flex items-center gap-2 mb-4">
  <ClipboardList size={20} />
        <h2 className='text-xl font-semibold mb-4'>
          Order Information
        </h2></div>
        <div className='space-y-3'>
          <div className='flex justify-between'>
            <span className='   '>Order ID</span>
            <span className='font-medium '>{orderDetails.id}</span>
            </div>
           <div className="flex justify-between ">
      <span className="  ">
        Status
      </span>

      <span className="font-medium ">
        {orderDetails.status}
      </span>
    </div>

    <div className="flex justify-between ">
      <span className="  ">
        Order Date
      </span>

      <span className="font-medium ">
        {new Date(orderDetails.createdAt).toLocaleDateString()}
      </span>
    </div>
        </div>
      </div>
      </div>
  )}
</div>
);
}

export default AdminOrderDetails

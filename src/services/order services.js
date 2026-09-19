import axios from "axios"
const API_URL=import.meta.env.VITE_API_URL;

export const addOrder=async(orderData)=>{
    const res=await axios.post(`${API_URL}/orders`,orderData)
    return res.data
}

export const getOrders=async(userId)=>{
    const res=await axios.get(`${API_URL}/orders?userId=${userId}`)
    return res.data
}
export const getAllOrders=async()=>{
    const res =await axios.get(`${API_URL}/orders`)
    return res.data
}
export const updateOrderStatus=async(id,status)=>{
    const res=await axios.patch(`${API_URL}/orders/${id}`,
        {status:status})
        return res.data
}
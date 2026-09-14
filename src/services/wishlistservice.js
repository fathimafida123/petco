import axios from "axios";
const API_URL=import.meta.env.VITE_API_URL;

export const getwishlist=async(userId)=>{
    const response=await axios.get(`${API_URL}/wishlist?userId=${userId}`)
    return response.data //load user all wishlist
}

export const addWishlist=async(wishlistData)=>{
 const userWishlist=await getwishlist(wishlistData.userId)

 const existingItem=userWishlist.find((item)=>String(item.productId)===String(wishlistData.productId));
 if(existingItem){
    return existingItem
 }
 const newResponse=await axios.post(`${API_URL}/wishlist`,wishlistData)
 return newResponse.data
 }

 export const deletewishlist=async(wishlistId)=>{
    const response=await axios.delete(`${API_URL}/wishlist/${wishlistId}`)
    return response.data
 }
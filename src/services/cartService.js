import axios from "axios";
const API_URL= import.meta.env.VITE_API_URL;

export const addCart=async(cartData)=>{
    const response=await axios.post(`${API_URL}/carts`,cartData);
    return response
}
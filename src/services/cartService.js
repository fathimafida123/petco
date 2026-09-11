import axios from "axios";
const API_URL= import.meta.env.VITE_API_URL;

export const addCart=async(cartData)=>{
    const response=await axios.post(`${API_URL}/carts`,cartData);
    return response.data
}

export const getCart = async (userId) => {
  const response = await axios.get(
    `${API_URL}/carts?userId=${userId}`
  );

  return response.data;
};


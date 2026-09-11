import axios from "axios";
const API_URL= import.meta.env.VITE_API_URL;


// export const addCart=async(cartData)=>{
//     const response=await axios.post(`${API_URL}/carts`,cartData);
//     return response.data
// }

export const getCart = async (userId) => {
  const response = await axios.get(
    `${API_URL}/carts?userId=${userId}`
  );

  return response.data;
};

export const addCart=async(cartData)=>{
    const response=await axios.get(`${API_URL}/carts?userId=${cartData.userId}&productId=${cartData.productId}`);
    const existingCart=response.data;
    if(existingCart.length>0){
        const item=existingCart[0];

        const updatedResponse=await axios.patch(`${API_URL}/carts/${item.id}`,{quantity:item.quantity+cartData.quantity,});
        return updatedResponse.data
    }
    const newResponse=await axios.post(`${API_URL}/carts`,cartData);
    return newResponse.data
};
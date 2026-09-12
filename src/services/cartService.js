import axios from "axios";
const API_URL= import.meta.env.VITE_API_URL;


// export const addCart=async(cartData)=>{
//     const response=await axios.post(`${API_URL}/carts`,cartData);
//     return response.data
// }

export const getCart = async (userId) => {
  const response = await axios.get(
    `${API_URL}/carts?userId=${userId}`// logined user data by using logined userid
  );

  return response.data;
};
export const deleteCart=async (cartId)=>{
  await axios.delete(`${API_URL}/carts/${cartId}`)
}

export const addCart = async (cartData) => {
  // userId filter reliable aanu (numeric-looking allaathath kondu)
  const response = await axios.get(`${API_URL}/carts?userId=${cartData.userId}`);
  const userCart = response.data;

  // productId match JS-il thanne cheyyuka - json-server-inte buggy
  // numeric query-coercion-ine avoid cheyyaan
  const existingItem = userCart.find(
    (item) => String(item.productId) === String(cartData.productId)
  );

  if (existingItem) {
    const newQuantity = Number(existingItem.quantity) + Number(cartData.quantity);
    const updatedResponse = await axios.patch(
      `${API_URL}/carts/${existingItem.id}`,
      { quantity: newQuantity }
    );
    return updatedResponse.data;
  }

  const newResponse = await axios.post(`${API_URL}/carts`, cartData);
  return newResponse.data;
};
export const updateCart=async (cartId,quantity)=>{
  const response=await axios.patch(`${API_URL}/carts/${cartId}`,
    {quantity:Number(quantity)}
  );
  return response.data
}


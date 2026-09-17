import axios from"axios"
const API_URL=import.meta.env.VITE_API_URL;
export const registerUser=(user)=>{
    return axios.post(`${API_URL}/users`,user);
};
export const getUsers=async()=>{
    const res =await axios.get(`${API_URL}/users`);
    console.log(res)
    return res.data;
};

export const getUserById = async (userId) => {
  const response = await axios.get(`${API_URL}/users/${userId}`);
  return response.data;
};
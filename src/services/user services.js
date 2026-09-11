import axios from"axios"
const API_URL=import.meta.env.VITE_API_URL;
export const registerUser=(user)=>{
    return axios.post(`${API_URL}/users`,user);
};
export const getUsers=()=>{
    return axios.get(`${API_URL}/users`)
};

export const getUserById = async (userId) => {
  const response = await axios.get(`${API_URL}/users/${userId}`);
  return response.data;
};
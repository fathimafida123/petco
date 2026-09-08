import axios from"axios"
const API_URL=import.meta.env.VITE_API_URL;
export const registerUser=(user)=>{
    return axios.post(`${API_URL}/users`,user);
};
export const getUsers=()=>{
    return axios.get(`${API_URL}/users`)
};
export const loginUser=(user)=>{
    return axios.post(`${API_URL}/role`,user)
}
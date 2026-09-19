import axios from "axios"
const API_URL= import.meta.env.VITE_API_URL;

export const getProducts=async()=>{
   const response=await axios.get(`${API_URL}/products`)
   return response.data
}
export const createAdminProduct=async (product)=>{
   const response=await axios.post(`${API_URL}/products`,product)
   return response.data
}
export const updateAdminProduct=async(id,product)=>{
   const response=await axios.put(`${API_URL}/products/${id}`,product);
   return response.data
}

export const deleteAdminProduct=async (id)=>{
   const response=await axios.delete(`${API_URL}/products/${id}`);
   return response.data
}

export const softDeleteProduct=async(id)=>{
   const response=await axios.patch(`${API_URL}/products/${id}`,{deleted:true})
   return response.data
}

export const restoreProduct=async(id)=>{
   const response=await axios.patch(`${API_URL}/products/${id}`,{delete:false})
   return response.data
}

export const permenentDelete=async(id)=>{
   const response=await axios.delete(`${API_URL}/products/${id}`)
   response.data
}
import axios from "axios"

const product=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    headers:{
       'Content-Type':'application/json',
       'Authorization':`Bearer ${localStorage.getItem('authToken')}`
    }
})
export const addProduct=async(data)=>{
  const response=await product.post('/api/v1/products',data)
  if(response){
    return response.data
  }
}
export const getConsoles=async() => {
  const response=await product.get('/api/v1/products?category=console')
  if(response){
    return response
  }
}
export const updateProduct=async(id,updatedData)=>{
  const response=await product.put(`/api/v1/products/${id}`,updatedData
  )
  if(response){
    return response
  }
}
export const getProducts=async() => {
  const response=await product.get('/api/v1/products')
  if(response){
    return response
  }
}
export const deleteProduct=async(id)=>{
const response=await product.delete(`/api/v1/products/${id}`)
if(response){
  return response
}
}
export const getProduct=async(id)=>{
    const response=await product.get(`/api/v1/products/${id}`)
    if(response){
        return response;
    }
}

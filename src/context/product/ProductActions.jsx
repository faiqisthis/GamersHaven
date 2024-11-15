import axios from "axios"

const product=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    headers:{
       'Content-Type':'application/json',
    }
})
export const getConsoles=async() => {
  const response=await product.get('/api/v1/products?category=console')
  if(response){
    return response
  }
}
export const getProduct=async(id)=>{
    const response=await product.get(`/api/v1/products/${id}`)
    if(response){
        console.log(response.data.data)
        return response;
    }
}

import axios from 'axios'

const token=localStorage.getItem("authToken")
const users=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    headers:{
        'Authorization': `Bearer ${token}`,
       'Content-Type':'application/json',
    }
})
export const getUsers=async() => {
  const response=await users.get('/api/v1/users')
  if(response){
    return response
  }
}
export const deleteUser=async(id)=>{
  const response=await users.delete(`/api/v1/users/${id}`)
  if(response){
    return response
  }
}

export const updateUser=async(id,updatedUser)=>{
  const response=await users.put(`/api/v1/users/${id}`,updatedUser)
  if(response){
    return response
  }
}
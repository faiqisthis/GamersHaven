import axios from 'axios'

const users=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    headers:{
        'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
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
export const createUser=async(newUser)=>{
  const response=await users.post('/api/v1/users',newUser)
  if(response){
    return(response.data)
  }
  
}
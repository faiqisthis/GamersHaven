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

import users from '../../../_data/users.json'
import axios from 'axios'

const user=axios.create({
   baseURL:import.meta.env.VITE_BACKEND_URL,
   headers:{
      'Content-Type':'application/json',
   }
})
export const loginUser=async (email,password)=>{
   const credentials={email,password}
  const response=await user.post("/api/v1/auth/login",credentials)
  console.log(response.data)
  if(response.data.token){
   localStorage.setItem("authToken",response.data.token)
}
  return response.data.token;
}
export const registerUser= async (firstName,lastName,email,password)=>{
   const credentials={firstName,lastName,email,password,role:"user"}
   const response=await user.post("/api/v1/auth/register",credentials)
   console.log(response.data)
   if(response.data.token){
      localStorage.setItem("authToken",response.data.token)
   }
   return response.data.token;
}
export const logoutUser=()=>{
  localStorage.removeItem("authToken")
  

}
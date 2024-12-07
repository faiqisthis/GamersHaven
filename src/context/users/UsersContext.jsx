import { createContext, useReducer } from "react";
import UsersReducer from "./UsersReducer";
const UsersContext = createContext();

export const UsersProvider=({children}) => {
  const initalState={
    users:[],
    loading:true,
    cart:[]

  }
  const [state,usersDispatch]=useReducer(UsersReducer,initalState)

  return(
    <UsersContext.Provider value={{...state,usersDispatch}}>
        {children}
    </UsersContext.Provider>
  )
}
export default UsersContext;

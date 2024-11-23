import { createContext, useReducer } from "react";
import UsersReducer from "./UsersReducer";
const UsersContext = createContext();

export const UsersProvider=({children}) => {
  const initalState={
    users:null,
    loading:true
  }
  const [state,dispatch]=useReducer(UsersReducer,initalState)

  return(
    <UsersContext.Provider value={{...state,dispatch}}>
        {children}
    </UsersContext.Provider>
  )
}
export default UsersContext;

import { createContext, useReducer } from "react";
import productReducer from "./ProductReducer";
const ProductContext = createContext();

export const ProductProvider=({children}) => {
  const initalState={
    consoles: [],
    games:null,
    accessories:null,
    loading:true,
    upload_loading:false
  }
  const [state,dispatch]=useReducer(productReducer,initalState)

  return(
    <ProductContext.Provider value={{...state,dispatch}}>
        {children}
    </ProductContext.Provider>
  )
}
export default ProductContext;

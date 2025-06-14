import { createContext, useReducer } from "react";
import ordersReducer from "./OrdersReducer";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const initalState = {
    orders: [],
  };
  const [state, ordersDispatch] = useReducer(ordersReducer, initalState);
  return (
    <OrdersContext.Provider value={{ ...state, ordersDispatch }}>
      {children}
    </OrdersContext.Provider>
  );
};
export default OrdersContext;

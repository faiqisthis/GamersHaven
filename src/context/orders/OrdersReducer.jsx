const ordersReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDERS":
      return { ...state, orders: action.payload };
    case "ADD_ORDER":
      return { ...state, orders: [...state.orders, action.payload] };
    case "DELETE_ORDER":
      return{
        ...state,orders:state.orders.filter(order=>order._id!==action.payload)
      }
    default:
      return state;
  }
};
export default ordersReducer;

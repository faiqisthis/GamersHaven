const productReducer = (state, action) => {
  switch (action.type) {
    case "GET_CONSOLES":
      return { ...state, consoles: action.payload };
  case "SET_LOADING":
    return{
        ...state,
        loading: action.payload
    }
  default:
    return state
}
};
export default productReducer
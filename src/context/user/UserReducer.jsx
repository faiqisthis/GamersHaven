const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "SET_CART":
      return {
        ...state,
        user: action.payload
    }
    default:
      return state;
  }
};
export default userReducer;

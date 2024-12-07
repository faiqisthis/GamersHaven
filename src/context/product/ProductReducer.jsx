const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONSOLES":
      return { ...state, consoles: action.payload };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_UPLOAD_LOADING":
      return {
        ...state,
        upload_loading: action.payload,
      };
    case "SET_DATA":
      return {
        ...state,
        consoles: action.payload.filter((item) => item.category === "console"),
        games: action.payload.filter((item) => item.category === "game"),
        accessories: action.payload.filter(
          (item) => item.category === "accessory"
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        consoles: state.consoles.filter((item) => item._id !== action.payload),
        games: state.games.filter((item) => item._id !== action.payload),
        accessories: state.accessories.filter(
          (item) => item._id !== action.payload
        ),
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        consoles: state.consoles.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
        games: state.games.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
        accessories: state.accessories.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };

    case "ADD_PRODUCT":
      const { category } = action.payload;
      const categoryMap = {
        console: "consoles",
        game: "games",
        accessory: "accessories",
      };

      const targetArray = categoryMap[category]; 

      return {
        ...state,
        [targetArray]: [...state[targetArray], action.payload],
      };

    default:
      return state;
  }
};
export default productReducer;

import { useReducer, createContext, useEffect } from "react";
import userReducer from "./UserReducer";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const initialState = {
    user: null,
    token: null
  };

  const [state, userDispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      if (state.token) {
        try {
          
          const response = await axios.get("http://localhost:8000/api/v1/auth/me", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          userDispatch({
            type: "SET_USER",
            payload: response.data.data,
          });
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [state.token]); // Dependency on state.token to refetch when token changes

  return (
    <UserContext.Provider value={{ ...state, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

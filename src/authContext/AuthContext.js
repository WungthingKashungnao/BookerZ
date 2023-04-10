import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null, //getting user we have stored in the local storage, meaning user logged in
  loading: false,
  error: null,
};
export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  //action means dispatch here in the reducer
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

// children are the componentes which one to acces our data
export const AuthContextProvider = ({ children }) => {
  // dispatch means action in the reducer
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user)); //stroing logged in user to local storage
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

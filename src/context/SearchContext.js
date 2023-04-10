import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  city: undefined,
  date: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};
export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  //action means dispatch here in the reducer
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload; //payloadis the data passed from user
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

// children are the componentes which one to acces our data
export const SearchContextProvider = ({ children }) => {
  // dispatch means action in the reducer
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        date: state.date,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

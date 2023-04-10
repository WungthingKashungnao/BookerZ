import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SearchContextProvider } from "./context/SearchContext";
import { AuthContextProvider } from "./authContext/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <AuthContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AuthContextProvider>
  </>
);

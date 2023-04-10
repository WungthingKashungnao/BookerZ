import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* route for the Home page */}
        <Route path="/list" element={<List />} />{" "}
        {/* route for the list of hotels */}
        <Route path="/hotel/:id" element={<Hotel />} />{" "}
        {/* route for a single hotel */}
        {/* route for login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

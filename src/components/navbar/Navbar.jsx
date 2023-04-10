import { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      {/* navbar container start */}
      <div className="navContainer">
        {/* navbar logo */}
        <Link to={"/"}>
          <span className="logo">BookerZ</span>
        </Link>

        {/* navbar items */}
        {/* show buttons or username based on whethter the user is logged in or not */}
        {user ? (
          user.username
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
        )}
      </div>
      {/* navbar container end */}
    </div>
  );
};

export default Navbar;

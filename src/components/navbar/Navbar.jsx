import "./navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      {/* navbar container start */}
      <div className="navContainer">
        {/* navbar logo */}
        <Link to={"/"}>
          <span className="logo">BookerZ</span>
        </Link>

        {/* navbar items */}
        <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>
      </div>
      {/* navbar container end */}
    </div>
  );
};

export default Navbar;

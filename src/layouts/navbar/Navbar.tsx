import { NavLink, Outlet } from "react-router-dom";
import LogoComponent from "../../components/logo/LogoComponent";

import "./Navbar.css";
import "../../App.css";

const Navbar = () => {
  return (
    <div className="page-container">
      <header>
        <div className="nav-container">
          <LogoComponent />
          <div className="nav-option-section">
            <NavLink className="nav-option-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-option-link" to="about">
              about
            </NavLink>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;

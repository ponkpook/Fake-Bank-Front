import React from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";

interface NavMenuProps {
  isMenuOpen: boolean;
  isLoggedIn: boolean;
  isAdmin: boolean; // Add isAdmin prop
}

const NavMenu: React.FC<NavMenuProps> = ({ isMenuOpen, isLoggedIn, isAdmin }) => {
  return (
    <div
      className={`md:hidden ${isMenuOpen ? "block" : "hidden"} nav-bg-green shadow-lg`}
    >
      <div className="flex flex-col p-4 space-y-2">
        {/* Pass isAdmin prop to NavItem */}
        <NavItem isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="block text-black rounded-full font-light px-space-4 py-space-2 shadow-lg hover:bg-native-milk/50 transition"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="block bg-native-red rounded-full text-black font-light px-space-4 py-space-2 shadow-lg hover:bg-orange-600 transition"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <Link
            to="/"
            className="block bg-native-red rounded-full text-black font-light px-space-4 py-space-2 shadow-lg hover:bg-orange-600 transition"
          >
            Sign Off
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavMenu;



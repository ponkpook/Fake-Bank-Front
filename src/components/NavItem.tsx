import React from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  isLoggedIn: boolean;
  isAdmin: boolean; // Add isAdmin prop
}

const NavItem: React.FC<NavItemProps> = ({ isLoggedIn, isAdmin }) => {
  const getNavLinkClass = (isActive: boolean, isClickable: boolean) =>
    `text-black text-[20px] rounded-full px-space-4 hover:bg-native-milk/50 transition ${
      isActive ? "font-bold underline" : "font-light"
    } ${!isClickable ? "pointer-events-none opacity-50" : ""}`;

  return (
    <>
      {isAdmin ? (
        <>
          <NavLink
            to="/"
            className={({ isActive }) => getNavLinkClass(isActive, true)} // My home is always clickable
          >
            Homepage
          </NavLink>
          {/* Render this if the user is an admin */}
          <NavLink
            to="/user-management"
            className={({ isActive }) => getNavLinkClass(isActive, isLoggedIn)}
          >
            User management
          </NavLink>
        </>
      ) : (
        <>
          {/* Render this if the user is not an admin */}
          <NavLink
            to="/"
            className={({ isActive }) => getNavLinkClass(isActive, true)} // My home is always clickable
          >
            Homepage
          </NavLink>
          <NavLink
            to="/accounts"
            className={({ isActive }) => getNavLinkClass(isActive, isLoggedIn)}
          >
            View accounts
          </NavLink>
          <NavLink
            to="/transfer"
            className={({ isActive }) => getNavLinkClass(isActive, isLoggedIn)}
          >
            Transfer
          </NavLink>
          <NavLink
            to="/transaction"
            className={({ isActive }) => getNavLinkClass(isActive, isLoggedIn)}
          >
            Transaction
          </NavLink>
        </>
      )}
    </>
  );
};

export default NavItem;



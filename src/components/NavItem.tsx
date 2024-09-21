import React from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  isLoggedIn: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ isLoggedIn }) => {
  const getNavLinkClass = (isActive: boolean, isClickable: boolean) =>
    `text-black rounded-full px-space-4 py-space-2 hover:bg-native-milk/50 transition ${
      isActive ? "font-bold underline" : "font-light"
    } ${!isClickable ? "pointer-events-none opacity-50" : ""}`;

  return (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => getNavLinkClass(isActive, true)} // My home is always clickable
      >
        My home
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
  );
};

export default NavItem;

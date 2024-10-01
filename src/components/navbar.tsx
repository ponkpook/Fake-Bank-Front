import React, { useState } from "react";
import NavMenu from "./NavMenu";
import NavItem from "./NavItem";
import SignUpAndInButtons from "./SignUpAndInButtons";
import SignOffButton from "./SignOffButton";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //const [isLoggedIn, setIsLoggedIn] = useState(false); // Set as true for testing
  const [isAdmin, setIsAdmin] = useState(false); // Assume user is admin for testing
  const isLoggedIn = sessionStorage.getItem("username") !== null;
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="nav-bg-green text-black p-space-1 shadow-lg">
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-6 md:space-x-8 lg:space-x-10">
          <img
            src="./assets/logo-icon.png"
            alt="logo-icon"
            className="w-[80px] h-[80px] ml-4"
          />
          <span className="text-xxxxl font-prosto">Fake Bank</span>
        </div>

        {/* Full-screen Navigation Bar */}
        <div className="hidden md:flex flex-grow justify-center space-x-8">
          <NavItem isLoggedIn={isLoggedIn} isAdmin={isAdmin} /> {/* Pass isAdmin prop */}
        </div>

        {/* Conditional Login/Signup or Sign Off Buttons */}
        {isLoggedIn ? <SignOffButton /> : <SignUpAndInButtons />}

        {/* Menu Toggle Button for Mobile */}
        <button
          className="block md:hidden text-xl focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="h-6 w-6 text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <NavMenu isMenuOpen={isMenuOpen} isLoggedIn={isLoggedIn} isAdmin={isAdmin} />

    </nav>
  );
}

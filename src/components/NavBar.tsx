import React from "react";
import { Link } from "react-router-dom";
import bankLogo from "../assets/bankLogo.png";

const NavBar = () => {
  return (
    <nav className="bg-[#CBD6CC] shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-between items-center h-[107px]">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={bankLogo} // Use the imported Logo variable
              alt="Bank Logo"
              className="h-87 w-79"
            />

            <span className="text-2xl font-bold">Fake Bank</span>
          </Link>
        </div>

        <ul className="flex space-x-8">
          <li>
            <Link
              to="/my-home"
              className="text-lg font-bold text-black hover:text-gray-800"
            >
              My home
            </Link>
          </li>
          <li>
            <Link
              to="/accounts"
              className="text-lg font-bold text-black hover:text-gray-800"
            >
              View accounts
            </Link>
          </li>
          <li>
            <Link
              to="/transfer"
              className="text-lg font-bold text-black hover:text-gray-800"
            >
              Transfer
            </Link>
          </li>
          <li>
            <Link
              to="/transaction"
              className="text-lg font-bold text-black hover:text-gray-800"
            >
              Transaction
            </Link>
          </li>
        </ul>

        <div className="flex space-x-4 items-center">
          <Link to="/login" className="text-black text-sm font-medium">
            Log In
          </Link>
          <div className="relative flex items-center">
            <Link to="/signup">
              <div className="bg-red-500 text-white text-sm font-medium py-2 px-4 rounded-[35px] flex items-center justify-center">
                Sign up
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

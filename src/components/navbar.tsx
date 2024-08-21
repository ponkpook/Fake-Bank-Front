import React from "react";

export function Navbar() {
  return (
    <nav className="bg-bg-green text-black p-space-10">
      <div className="container flex justify-between items-center">
        {/* Logo 区域 */}
        <div className="flex items-center space-x-2">
          <div className="bg-white p-2 rounded-full">
            <svg
              className="h-8 w-8 text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2C13.105 2 14 2.895 14 4C14 5.105 13.105 6 12 6C10.895 6 10 5.105 10 4C10 2.895 10.895 2 12 2ZM12 8C13.105 8 14 8.895 14 10C14 11.105 13.105 12 12 12C10.895 12 10 11.105 10 10C10 8.895 10.895 8 12 8ZM12 14C13.105 14 14 14.895 14 16C14 17.105 13.105 18 12 18C10.895 18 10 17.105 10 16C10 14.895 10.895 14 12 14ZM12 20C13.105 20 14 20.895 14 22C14 23.105 13.105 24 12 24C10.895 24 10 23.105 10 22C10 20.895 10.895 20 12 20Z"
              />
            </svg>
          </div>
          <span className="font-bold text-xl">Fake Bank</span>
        </div>

        {/* 导航链接 */}
        <div className="flex space-x-8">
          <a
            href="#"
            className="font-light rounded-full px-space-4 py-space-2 hover:bg-native-milk/50 transition"
          >
            My home
          </a>
          <a
            href="#"
            className="font-light rounded-full px-space-4 py-space-2 hover:bg-native-milk/50 transition"
          >
            View accounts
          </a>
          <a
            href="#"
            className="font-light rounded-full px-space-4 py-space-2 hover:bg-native-milk/50 transition"
          >
            Transfer
          </a>
          <a
            href="#"
            className="font-light rounded-full px-space-4 py-space-2 hover:bg-native-milk/50 transition"
          >
            Transaction
          </a>
        </div>

        {/* 登录和注册按钮 */}
        <div className="flex space-x-4">
          <button className="bg-transparent text-black rounded-full font-light px-space-4 py-space-2 shadow-lg  hover:bg-native-milk/50 transition">
            Log In
          </button>
          <button className="bg-native-red rounded-full text-black font-light px-space-4 py-space-2 shadow-lg hover:bg-orange-600 transition">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}

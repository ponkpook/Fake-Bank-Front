import React from "react";
import { Link } from "react-router-dom";

export function LoginSection() {
  return (
    <div className="bg-native-milk w-[520px] h-[280px] rounded-[40px] flex flex-col items-center justify-center shadow-lg ">
      <div className="text-left">
        <h2 className="text-black text-[32px] font-prosto mx-space-10 ">
          Experience Banking, Simplified.
        </h2>
        <p className="text-black font-poppins font-light mx-space-8 max-w-[480px] pt-space-2">
          Learn the essentials of online banking with confidence — our simple
          and guided platform is here to help you every step of the way.
        </p>
      </div>
      <div className="flex flex-row items-center justify-center pt-space-5 gap-[60px]">
        <Link
          to="/login"
          className="bg-native-red rounded-full text-black font-poppins font-light px-space-4 py-space-2 shadow-lg hover:bg-orange-600 transition"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="bg-transparent border-black border-[1px] rounded-full text-black px-space-4 py-space-2 shadow-lg hover:bg-bg-green/50 transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

import React from "react";
import user from "../assets/user.png";

const SignUpPage = () => {
  return (
    <div className="bg-[#CBD6CC] min-h-screen flex justify-center items-center">
      <div className="bg-[#F2EDE3] rounded-3xl shadow-lg flex flex-row overflow-hidden w-[1000px] h-[600px] rounded-[35px]">
        {/* Left Side */}
        <div className="bg-[#DDE4DE] flex flex-col items-center justify-center w-1/2 p-8">
          {/* Placeholder for user icon */}
          <img
            src={user} // Ensure you replace this with the correct image path
            alt="User Icon"
            className="h-25 w-25"
          />

          <h2 className="text-xl font-bold text-center mb-4">
            Let’s set up your bank account!
          </h2>
          <p className="text-base text-center text-gray-700">
            Your money is safe with us! Don’t worry, it should take a couple of
            minutes.
          </p>
        </div>

        {/* Right Side */}
        <div className="bg-[#F2EDE3] flex flex-col justify-center p-8 w-1/2 ">
          <h2 className="text-xl font-bold mb-6 text-center">
            Create an account
          </h2>

          <label className="text-base mb-2 ">Enter your name</label>
          <input
            type="text"
            className="mb-4 p-2 w-full bg-zinc-300 rounded-lg rounded-[10px]"
            placeholder="Your name"
          />

          <label className="text-base mb-2">Enter password</label>
          <input
            type="password"
            className="mb-2 p-2 w-full bg-zinc-300 rounded-lg rounded-[10px]"
            placeholder="Your password"
          />
          <p className="text-xs text-gray-500 mb-4">
            (Please create a password that is at least 8 characters long and
            includes a mix of uppercase and lowercase letters for added
            security)
          </p>

          <a
            href="/signup"
            className="bg-red-500 text-white text-center font-medium py-3 px-6 rounded-3xl rounded-[35px]"
          >
            Ready? Sign up now!
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

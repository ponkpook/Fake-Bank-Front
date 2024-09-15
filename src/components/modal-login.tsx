import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GreetingSection from "./GreetingSection";
import { validateCredentials } from "./ValidateInfo";

export const ModalLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 用于存储错误信息
  const [usernameError, setUsernameError] = useState(""); // 用户名错误信息
  const [passwordError, setPasswordError] = useState(""); // 密码错误信息
  const navigate = useNavigate(); // 使用 useNavigate 钩子

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // 使用验证逻辑
    const { usernameError, passwordError } = validateCredentials(username, password);

    if (usernameError || passwordError) {
      setUsernameError(usernameError || "");
      setPasswordError(passwordError || "");
      return;
    }

    // 清除之前的错误信息
    setUsernameError("");
    setPasswordError("");

    axios
      .post("http://localhost:3001/auth/login", { username, password })
      .then((response) => {
        if (response?.data?.data?.success) {
          console.log("Login successful:", response.data);
          navigate("/accounts");
        } else {
          setError("Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        setError("An error occurred while logging in. Please try again.");
      });
  };

  return (
    <div className="flex flex-col md:flex-row w-[90%] mx-auto bg-native-milk shadow-lg mt-10 rounded-m">
      <div className="flex-1 flex items-center justify-center p-4 md:p-10">
        <GreetingSection
          title="Welcome Back!"
          message="Your money is safe with us! Don’t worry it should take a couple of minutes."
        />
      </div>

      <div className="flex-1 flex flex-col justify-center p-4 md:p-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-space-10 mx-auto w-full max-w-md"
        >
          <div className="flex justify-center mb-6">
            <p className="font-prosto text-xxl font-bold">
              Hello Again!
            </p>
          </div>
          <div className="flex flex-col gap-space-10">
            <div className="flex flex-col gap-space-3">
              <p className="text-start font-poppins font-[200] text-l">
                Enter your name
              </p>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className={`w-full rounded-s h-[35px] border-none focus:outline-none pl-space-4 ${usernameError ? "border-red-500 border-2" : ""}`}
              />
              {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
            </div>
            <div className="flex flex-col gap-space-3">
              <p className="text-start font-poppins font-[200] text-l">
                Enter password
              </p>
              <input
                className={`w-full rounded-s h-[35px] border-none focus:outline-none pl-space-4 ${passwordError ? "border-red-500 border-2" : ""}`}
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              {/* <p className="font-poppins text-s text-black/50 text-center pt-space-2">
                Please create a password that is at least 8 characters long and includes a mix of uppercase and lowercase letters for added security
              </p> */}
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            <div className="flex flex-col gap-space-5 mt-10">
              <button className="bg-native-red rounded-full text-black font-poppins font-light px-[70px] py-space-4 shadow-lg hover:bg-orange-600 transition">
                Log in
              </button>
              <div className="flex flex-col gap-space-3 pt-space-2 text-center">
                <Link to="/" className="font-poppins text-s">
                  Forget password?
                </Link>
                <div className="flex flex-col items-center">
                  <span className="font-poppins text-s">New to Fake Bank?</span>
                  <Link to="/signup" className="font-poppins text-s">
                    Register now!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};